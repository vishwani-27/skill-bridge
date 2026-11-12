/**
 * SkillBridge - Data Store & LocalStorage Manager
 * Handles state persistence, CRUD operations, matching algorithm, and reactive updates.
 */

class SkillBridgeStore {
  constructor() {
    this.STORAGE_KEY = 'SKILLBRIDGE_DATA_V1';
    this.THEME_KEY = 'SKILLBRIDGE_THEME';
    this.listeners = [];
    this.initData();
  }

  initData() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) {
      this.resetToDefaults();
    } else {
      try {
        this.data = JSON.parse(raw);
      } catch (e) {
        console.error('Failed to parse storage, resetting to initial seed.', e);
        this.resetToDefaults();
      }
    }
  }

  resetToDefaults() {
    // Deep clone initial data
    this.data = JSON.parse(JSON.stringify(window.INITIAL_DATA || {}));
    this.save();
    this.notify('reset');
  }

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('LocalStorage save error:', e);
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify(event, payload = {}) {
    this.listeners.forEach(cb => {
      try {
        cb(event, payload);
      } catch (err) {
        console.error('Listener callback error:', err);
      }
    });
  }

  // Current User
  getUser() {
    return this.data.currentUser;
  }

  updateUser(updates) {
    this.data.currentUser = { ...this.data.currentUser, ...updates };
    this.save();
    this.notify('user:updated', this.data.currentUser);
    return this.data.currentUser;
  }

  addKarmaCredits(amount, reason = '') {
    this.data.currentUser.credits = (this.data.currentUser.credits || 0) + amount;
    if (reason) {
      this.data.recentActivities.unshift({
        id: 'act_' + Date.now(),
        icon: 'fa-coins',
        color: '#f59e0b',
        title: `+${amount} Karma Credits`,
        desc: reason,
        time: 'Just now'
      });
    }
    this.save();
    this.notify('credits:changed', { credits: this.data.currentUser.credits, amount, reason });
  }

  // Skills Management
  addSkillOffered(skill) {
    const newSkill = {
      id: 'sk_off_' + Date.now(),
      hoursShared: 0,
      endorsements: 0,
      ...skill
    };
    this.data.currentUser.skillsOffered.push(newSkill);
    this.save();
    this.notify('skills:changed');
    return newSkill;
  }

  removeSkillOffered(id) {
    this.data.currentUser.skillsOffered = this.data.currentUser.skillsOffered.filter(s => s.id !== id);
    this.save();
    this.notify('skills:changed');
  }

  addSkillWanted(skill) {
    const newSkill = {
      id: 'sk_want_' + Date.now(),
      priority: skill.priority || 'Medium',
      ...skill
    };
    this.data.currentUser.skillsWanted.push(newSkill);
    this.save();
    this.notify('skills:changed');
    return newSkill;
  }

  removeSkillWanted(id) {
    this.data.currentUser.skillsWanted = this.data.currentUser.skillsWanted.filter(s => s.id !== id);
    this.save();
    this.notify('skills:changed');
  }

  // Marketplace Skills
  getMarketplaceSkills() {
    return this.data.marketplaceSkills || [];
  }

  // Community Users
  getCommunityUsers() {
    return this.data.communityUsers || [];
  }

  // Exchange Requests
  getExchangeRequests() {
    return this.data.exchangeRequests || [];
  }

  createExchangeRequest(targetUserId, skillRequested, skillOffered, message, sessions) {
    const partner = this.data.communityUsers.find(u => u.id === targetUserId);
    const newRequest = {
      id: 'req_sent_' + Date.now(),
      type: 'sent',
      toUser: {
        id: partner ? partner.id : targetUserId,
        name: partner ? partner.name : 'Peer Member',
        avatar: partner ? partner.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        rating: partner ? partner.rating : 5.0
      },
      skillOffered: skillOffered,
      skillRequested: skillRequested,
      message: message || 'Hello! I would love to connect and swap skills with you.',
      sessions: sessions || '3 Sessions',
      status: 'pending',
      date: 'Just now'
    };

    this.data.exchangeRequests.unshift(newRequest);

    this.data.recentActivities.unshift({
      id: 'act_' + Date.now(),
      icon: 'fa-paper-plane',
      color: '#3b82f6',
      title: 'Exchange Proposal Sent',
      desc: `Sent swap request to ${partner ? partner.name : 'peer'} (${skillOffered} ⇄ ${skillRequested})`,
      time: 'Just now'
    });

    this.save();
    this.notify('exchange:created', newRequest);
    return newRequest;
  }

  acceptExchangeRequest(reqId) {
    const reqIndex = this.data.exchangeRequests.findIndex(r => r.id === reqId);
    if (reqIndex === -1) return null;

    const req = this.data.exchangeRequests[reqIndex];
    req.status = 'accepted';

    // Convert to active exchange partnership
    const newActiveExchange = {
      id: 'req_act_' + Date.now(),
      type: 'active',
      partnerUser: {
        id: req.fromUser.id,
        name: req.fromUser.name,
        avatar: req.fromUser.avatar,
        rating: req.fromUser.rating
      },
      youTeach: req.skillRequested,
      theyTeach: req.skillOffered,
      completedSessions: 0,
      totalSessions: 4,
      nextSessionDate: 'Saturday at 4:00 PM',
      status: 'in-progress',
      meetingRoomId: 'room_' + Date.now().toString(36)
    };

    // Remove from received pending and add to active
    this.data.exchangeRequests.splice(reqIndex, 1);
    this.data.exchangeRequests.unshift(newActiveExchange);

    // Schedule upcoming session
    this.data.upcomingSessions.unshift({
      id: 'sess_' + Date.now(),
      partner: req.fromUser.name,
      avatar: req.fromUser.avatar,
      topic: `${req.skillRequested} <-> ${req.skillOffered}`,
      type: 'Swap Session',
      time: 'Saturday, 4:00 PM - 5:00 PM',
      countdown: 'In 3 days',
      roomId: newActiveExchange.meetingRoomId
    });

    // Reward karma
    this.addKarmaCredits(30, `Accepted skill exchange request with ${req.fromUser.name}`);

    this.save();
    this.notify('exchange:accepted', newActiveExchange);
    return newActiveExchange;
  }

  declineExchangeRequest(reqId) {
    this.data.exchangeRequests = this.data.exchangeRequests.filter(r => r.id !== reqId);
    this.save();
    this.notify('exchange:declined', reqId);
  }

  completeSession(activeExchangeId) {
    const item = this.data.exchangeRequests.find(r => r.id === activeExchangeId && r.type === 'active');
    if (!item) return null;

    item.completedSessions = (item.completedSessions || 0) + 1;
    this.data.currentUser.hoursTaught += 1;
    this.data.currentUser.hoursLearned += 1;

    let isFullyCompleted = false;
    if (item.completedSessions >= item.totalSessions) {
      item.type = 'completed';
      item.status = 'completed';
      item.date = 'Completed Today';
      this.data.currentUser.completedExchanges += 1;
      isFullyCompleted = true;
    }

    this.addKarmaCredits(25, `Completed skill session with ${item.partnerUser.name}`);
    this.save();
    this.notify('session:completed', { exchange: item, isFullyCompleted });
    return item;
  }

  // Upcoming Sessions
  getUpcomingSessions() {
    return this.data.upcomingSessions || [];
  }

  // Chat & Messaging
  getChatThreads() {
    return this.data.chatThreads || [];
  }

  getChat(chatId) {
    return this.data.chatThreads.find(c => c.id === chatId || c.userId === chatId);
  }

  sendChatMessage(chatId, text) {
    let chat = this.data.chatThreads.find(c => c.id === chatId || c.userId === chatId);
    if (!chat) {
      // Create new thread
      const user = this.data.communityUsers.find(u => u.id === chatId);
      chat = {
        id: 'chat_' + (user ? user.id : 'unknown'),
        userId: user ? user.id : chatId,
        userName: user ? user.name : 'Peer Member',
        avatar: user ? user.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        skillSwapTopic: 'General Inquiry',
        unread: false,
        lastUpdated: 'Just now',
        messages: []
      };
      this.data.chatThreads.unshift(chat);
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    chat.messages.push({
      sender: 'me',
      text: text,
      time: timeStr
    });
    chat.lastUpdated = timeStr;

    this.save();
    this.notify('chat:message_sent', { chatId, text });

    // Mock smart peer response after a brief delay for realism!
    setTimeout(() => {
      this.simulatePeerResponse(chat);
    }, 1200);

    return chat;
  }

  simulatePeerResponse(chat) {
    const responses = [
      "That sounds fantastic! I've been reviewing the curriculum for our next session.",
      "Got it! I will prep some live coding examples and interactive exercises for us.",
      "Sounds like a plan! Let's meet directly in the SkillBridge Virtual Session room.",
      "Awesome! Let me know if you want me to share my practice notes beforehand.",
      "Great point! I'll update our session outline accordingly."
    ];
    const randomReply = responses[Math.floor(Math.random() * responses.length)];
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    chat.messages.push({
      sender: 'them',
      text: randomReply,
      time: timeStr
    });
    chat.lastUpdated = timeStr;
    chat.unread = true;

    this.save();
    this.notify('chat:message_received', { chatId: chat.id, message: randomReply, sender: chat.userName });
  }

  // Reviews & Testimonials
  getReviews() {
    return this.data.reviews || [];
  }

  addReview(partnerName, rating, text, skillSwapped) {
    const newRev = {
      id: 'rev_' + Date.now(),
      author: partnerName,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      rating: Number(rating) || 5,
      date: 'Just now',
      skillSwapped: skillSwapped || 'Peer Skill Exchange',
      comment: text
    };
    this.data.reviews.unshift(newRev);
    this.data.currentUser.reviewCount += 1;
    this.save();
    this.notify('review:added', newRev);
  }

  // Smart Matching Algorithm (The centerpiece for academic/prof evaluation!)
  calculateMatches() {
    const user = this.data.currentUser;
    const myOfferedTitles = (user.skillsOffered || []).map(s => s.title.toLowerCase());
    const myWantedTitles = (user.skillsWanted || []).map(s => s.title.toLowerCase());

    const matches = (this.data.communityUsers || []).map(peer => {
      const peerOffered = (peer.skillsOffered || []).map(s => s.toLowerCase());
      const peerWanted = (peer.skillsWanted || []).map(s => s.toLowerCase());

      // Check reciprocal matches:
      // What I want that peer offers
      const youLearnFromPeer = peer.skillsOffered.filter(s =>
        myWantedTitles.some(w => s.toLowerCase().includes(w) || w.includes(s.toLowerCase()))
      );

      // What peer wants that I offer
      const peerLearnsFromYou = peer.skillsWanted.filter(s =>
        myOfferedTitles.some(o => s.toLowerCase().includes(o) || o.includes(s.toLowerCase()))
      );

      let score = 50; // base compatibility
      if (youLearnFromPeer.length > 0 && peerLearnsFromYou.length > 0) {
        score = 90 + Math.min(9, (youLearnFromPeer.length + peerLearnsFromYou.length) * 3);
      } else if (youLearnFromPeer.length > 0 || peerLearnsFromYou.length > 0) {
        score = 75 + Math.min(12, (youLearnFromPeer.length + peerLearnsFromYou.length) * 4);
      } else {
        score = 60 + Math.floor(Math.random() * 15);
      }

      return {
        peer,
        score: Math.min(99, score),
        isDirectReciprocal: youLearnFromPeer.length > 0 && peerLearnsFromYou.length > 0,
        youLearn: youLearnFromPeer.length > 0 ? youLearnFromPeer : [peer.skillsOffered[0]],
        theyLearn: peerLearnsFromYou.length > 0 ? peerLearnsFromYou : [peer.skillsWanted[0]]
      };
    });

    // Sort descending by match score
    return matches.sort((a, b) => b.score - a.score);
  }

  // Theme Management
  getTheme() {
    return localStorage.getItem(this.THEME_KEY) || 'light';
  }

  setTheme(theme) {
    localStorage.setItem(this.THEME_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
    this.notify('theme:changed', theme);
  }

  toggleTheme() {
    const next = this.getTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    return next;
  }
}

// Global store instance
window.store = new SkillBridgeStore();
