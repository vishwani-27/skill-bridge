/**
 * SkillBridge - Main Application Controller
 * Handles UI rendering, user actions, modal dialogs, search/filter, and notifications.
 */

const AppUI = {
  activeChatId: 'chat_priya',
  activeSwapsTab: 'active',
  currentCategoryFilter: 'all',
  currentSearchQuery: '',

  init() {
    this.initTheme();
    this.bindGlobalEvents();
    this.renderHeaderUser();
    this.renderDashboard();

    // Listen for state changes
    window.store.subscribe((event, payload) => {
      this.handleStoreEvent(event, payload);
    });
  },

  initTheme() {
    const savedTheme = window.store.getTheme();
    window.store.setTheme(savedTheme);
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = savedTheme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
    }
  },

  handleStoreEvent(event, payload) {
    this.renderHeaderUser();

    switch (event) {
      case 'reset':
        this.showToast('Demo data reset to initial defaults!', 'info');
        this.renderDashboard();
        if (window.SkillCharts) window.SkillCharts.init();
        break;
      case 'skills:changed':
      case 'user:updated':
        this.renderHeaderUser();
        this.renderProfile();
        break;
      case 'exchange:created':
        this.showToast('Exchange proposal sent successfully!', 'success');
        this.renderDashboard();
        this.renderSwaps();
        break;
      case 'exchange:accepted':
        this.showToast('Exchange accepted! Partnership is now active.', 'success');
        this.renderDashboard();
        this.renderSwaps();
        break;
      case 'exchange:declined':
        this.showToast('Exchange request declined.', 'info');
        this.renderDashboard();
        this.renderSwaps();
        break;
      case 'session:completed':
        this.renderDashboard();
        this.renderSwaps();
        break;
      case 'chat:message_received':
        this.renderChatThreads();
        if (this.activeChatId === payload.chatId) {
          this.renderChatMessages(this.activeChatId);
        }
        break;
      case 'chat:message_sent':
        this.renderChatThreads();
        this.renderChatMessages(this.activeChatId);
        break;
    }
  },

  onViewChange(route) {
    switch (route) {
      case 'dashboard':
        this.renderDashboard();
        setTimeout(() => {
          if (window.SkillCharts) window.SkillCharts.init();
        }, 100);
        break;
      case 'browse':
        this.renderMarketplace();
        break;
      case 'matchmaker':
        this.renderMatchmaker();
        break;
      case 'swaps':
        this.renderSwaps();
        break;
      case 'messages':
        this.renderChat();
        break;
      case 'profile':
        this.renderProfile();
        break;
      case 'settings':
        this.renderSettings();
        break;
    }
  },

  bindGlobalEvents() {
    // Theme toggle
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const next = window.store.toggleTheme();
        themeBtn.innerHTML = next === 'dark' 
          ? '<i class="fas fa-sun"></i>' 
          : '<i class="fas fa-moon"></i>';
        this.showToast(`Switched to ${next} theme`, 'info');
      });
    }

    // Mobile Sidebar Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('mainSidebar');
    if (mobileMenuBtn && sidebar) {
      mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });

      // Close when clicking nav link on mobile
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 992) {
            sidebar.classList.remove('open');
          }
        });
      });
    }

    // Modal close triggers
    document.querySelectorAll('.modal-overlay, .btn-close-modal').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target === el || el.classList.contains('btn-close-modal')) {
          document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
        }
      });
    });

    // Marketplace Search & Filter
    const searchInput = document.getElementById('marketplaceSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.currentSearchQuery = e.target.value.toLowerCase().trim();
        this.renderMarketplace();
      });
    }

    // Marketplace Category Filters
    document.querySelectorAll('.category-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.category-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCategoryFilter = btn.getAttribute('data-category');
        this.renderMarketplace();
      });
    });

    // Swaps Tab Switching
    document.querySelectorAll('.swaps-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.swaps-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeSwapsTab = btn.getAttribute('data-tab');
        this.renderSwaps();
      });
    });

    // Form Submissions
    this.bindForms();
  },

  bindForms() {
    // Propose Exchange Form
    const reqForm = document.getElementById('proposeExchangeForm');
    if (reqForm) {
      reqForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const targetUserId = document.getElementById('exchangeTargetUserId').value;
        const skillRequested = document.getElementById('exchangeSkillRequested').value;
        const skillOffered = document.getElementById('exchangeSkillOfferedSelect').value;
        const sessions = document.getElementById('exchangeSessionsSelect').value;
        const msg = document.getElementById('exchangeMessageText').value;

        window.store.createExchangeRequest(targetUserId, skillRequested, skillOffered, msg, sessions);
        document.getElementById('exchangeModal').classList.remove('active');
      });
    }

    // Add Skill Offered Form
    const addOfferedForm = document.getElementById('addSkillOfferedForm');
    if (addOfferedForm) {
      addOfferedForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('offeredSkillTitle').value.trim();
        const category = document.getElementById('offeredSkillCategory').value;
        const level = document.getElementById('offeredSkillLevel').value;

        if (title) {
          window.store.addSkillOffered({ title, category, level });
          document.getElementById('addOfferedSkillModal').classList.remove('active');
          addOfferedForm.reset();
          this.showToast(`Added "${title}" to your offered skills!`, 'success');
        }
      });
    }

    // Add Skill Wanted Form
    const addWantedForm = document.getElementById('addSkillWantedForm');
    if (addWantedForm) {
      addWantedForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('wantedSkillTitle').value.trim();
        const category = document.getElementById('wantedSkillCategory').value;
        const targetLevel = document.getElementById('wantedSkillTargetLevel').value;
        const priority = document.getElementById('wantedSkillPriority').value;

        if (title) {
          window.store.addSkillWanted({ title, category, targetLevel, priority });
          document.getElementById('addWantedSkillModal').classList.remove('active');
          addWantedForm.reset();
          this.showToast(`Added "${title}" to your learning roadmap!`, 'success');
        }
      });
    }

    // Settings Profile Form
    const settingsForm = document.getElementById('settingsProfileForm');
    if (settingsForm) {
      settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('settingsUserName').value.trim();
        const title = document.getElementById('settingsUserTitle').value.trim();
        const university = document.getElementById('settingsUserUniversity').value.trim();
        const bio = document.getElementById('settingsUserBio').value.trim();

        window.store.updateUser({ name, title, university, bio });
        this.showToast('Profile updated successfully!', 'success');
      });
    }

    // Reset Demo Button
    const resetBtn = document.getElementById('btnResetDemo');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset all demo skills, exchanges, and messages to initial sample state?')) {
          window.store.resetToDefaults();
        }
      });
    }
  },

  renderHeaderUser() {
    const user = window.store.getUser();
    if (!user) return;

    const nameEls = document.querySelectorAll('.user-display-name');
    nameEls.forEach(el => el.textContent = user.name);

    const titleEls = document.querySelectorAll('.user-display-title');
    titleEls.forEach(el => el.textContent = user.title);

    const avatarEls = document.querySelectorAll('.user-display-avatar');
    avatarEls.forEach(el => {
      if (el.tagName === 'IMG') el.src = user.avatar;
    });

    const creditEls = document.querySelectorAll('.user-credits-val');
    creditEls.forEach(el => el.textContent = user.credits);

    const ratingEls = document.querySelectorAll('.user-rating-val');
    ratingEls.forEach(el => el.textContent = user.rating.toFixed(2));
  },

  renderDashboard() {
    const user = window.store.getUser();
    const requests = window.store.getExchangeRequests();
    const activeSwaps = requests.filter(r => r.type === 'active');
    const upcoming = window.store.getUpcomingSessions();
    const activities = window.store.data.recentActivities || [];

    // Stats
    const activeCountEl = document.getElementById('dashStatActiveSwaps');
    const offeredCountEl = document.getElementById('dashStatSkillsOffered');
    const wantedCountEl = document.getElementById('dashStatSkillsWanted');
    const creditsEl = document.getElementById('dashStatCredits');

    if (activeCountEl) activeCountEl.textContent = activeSwaps.length;
    if (offeredCountEl) offeredCountEl.textContent = user.skillsOffered.length;
    if (wantedCountEl) wantedCountEl.textContent = user.skillsWanted.length;
    if (creditsEl) creditsEl.textContent = user.credits;

    // Greeting
    const hour = new Date().getHours();
    let timeGreeting = 'Good Morning';
    if (hour >= 12 && hour < 17) timeGreeting = 'Good Afternoon';
    else if (hour >= 17) timeGreeting = 'Good Evening';

    const greetingEl = document.getElementById('dashboardGreeting');
    if (greetingEl) {
      greetingEl.textContent = `${timeGreeting}, ${user.name.split(' ')[0]} 👋`;
    }

    // Upcoming Sessions
    const sessionsContainer = document.getElementById('dashUpcomingSessionsList');
    if (sessionsContainer) {
      if (upcoming.length === 0) {
        sessionsContainer.innerHTML = `
          <div class="empty-state-sm">
            <i class="far fa-calendar-check"></i>
            <p>No upcoming sessions scheduled.</p>
          </div>
        `;
      } else {
        sessionsContainer.innerHTML = upcoming.map(sess => `
          <div class="session-card">
            <div class="session-avatar-wrap">
              <img src="${sess.avatar}" alt="${sess.partner}" class="avatar-md">
              <span class="session-type-pill ${sess.type.includes('Teaching') ? 'pill-teach' : 'pill-learn'}">
                ${sess.type.includes('Teaching') ? 'Teaching' : 'Learning'}
              </span>
            </div>
            <div class="session-info">
              <h4 class="session-partner">${sess.partner}</h4>
              <p class="session-topic">${sess.topic}</p>
              <div class="session-meta">
                <span><i class="far fa-clock"></i> ${sess.time}</span>
                <span class="badge-countdown"><i class="fas fa-hourglass-half"></i> ${sess.countdown}</span>
              </div>
            </div>
            <div class="session-action">
              <button class="btn btn-primary btn-sm btn-enter-room" onclick="SessionRoom.startSession(${JSON.stringify(sess).replace(/"/g, '&quot;')})">
                <i class="fas fa-video"></i> Enter Room
              </button>
            </div>
          </div>
        `).join('');
      }
    }

    // Smart Match Recommendations (Top 3)
    const matchesContainer = document.getElementById('dashMatchesList');
    if (matchesContainer) {
      const topMatches = window.store.calculateMatches().slice(0, 3);
      matchesContainer.innerHTML = topMatches.map(m => `
        <div class="match-item-card">
          <div class="match-header">
            <div class="user-cell">
              <img src="${m.peer.avatar}" alt="${m.peer.name}" class="avatar-sm">
              <div>
                <h5>${m.peer.name}</h5>
                <span class="text-muted text-xs">${m.peer.university}</span>
              </div>
            </div>
            <div class="match-score-badge">
              <span class="score-num">${m.score}%</span>
              <span class="score-label">Synergy</span>
            </div>
          </div>
          <div class="match-exchange-flow">
            <div class="flow-pill flow-they-teach">
              <span class="pill-label">They Teach:</span>
              <span class="pill-val">${m.youLearn[0] || m.peer.skillsOffered[0]}</span>
            </div>
            <div class="flow-arrow"><i class="fas fa-exchange-alt"></i></div>
            <div class="flow-pill flow-you-teach">
              <span class="pill-label">You Teach:</span>
              <span class="pill-val">${m.theyLearn[0] || m.peer.skillsWanted[0]}</span>
            </div>
          </div>
          <button class="btn btn-outline-primary btn-sm w-100 mt-2" onclick="AppUI.openExchangeModal('${m.peer.id}', '${m.youLearn[0] || m.peer.skillsOffered[0]}')">
            <i class="fas fa-paper-plane"></i> Initiate Skill Swap
          </button>
        </div>
      `).join('');
    }

    // Recent Activity Feed
    const activityContainer = document.getElementById('dashActivityList');
    if (activityContainer) {
      activityContainer.innerHTML = activities.slice(0, 4).map(act => `
        <div class="activity-timeline-item">
          <div class="act-icon-wrap" style="background-color: ${act.color}15; color: ${act.color};">
            <i class="fas ${act.icon}"></i>
          </div>
          <div class="act-content">
            <p class="act-title">${act.title}</p>
            <p class="act-desc">${act.desc}</p>
            <span class="act-time">${act.time}</span>
          </div>
        </div>
      `).join('');
    }
  },

  renderMarketplace() {
    const container = document.getElementById('marketplaceGrid');
    if (!container) return;

    let skills = window.store.getMarketplaceSkills();

    // Filter by Category
    if (this.currentCategoryFilter !== 'all') {
      skills = skills.filter(s => s.category.toLowerCase().includes(this.currentCategoryFilter.toLowerCase()));
    }

    // Filter by Search Query
    if (this.currentSearchQuery) {
      const q = this.currentSearchQuery;
      skills = skills.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.instructor.name.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (skills.length === 0) {
      container.innerHTML = `
        <div class="empty-state-lg col-span-full">
          <i class="fas fa-search"></i>
          <h3>No skills found matching "${this.currentSearchQuery}"</h3>
          <p>Try searching for different keywords like 'Python', 'React', 'Spanish', or 'Design'.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = skills.map(skill => `
      <div class="skill-card">
        <div class="skill-card-top">
          <span class="category-pill">${skill.category}</span>
          <span class="match-pill" style="background-color: ${skill.badgeColor}15; color: ${skill.badgeColor};">
            ${skill.badge}
          </span>
        </div>

        <h3 class="skill-title">${skill.title}</h3>
        <p class="skill-desc">${skill.description}</p>

        <div class="skill-tags">
          ${skill.tags.map(t => `<span class="tag-chip">#${t}</span>`).join('')}
        </div>

        <div class="skill-exchange-info">
          <div class="exchange-row">
            <span class="label"><i class="fas fa-hand-holding-heart"></i> Wants in return:</span>
            <span class="val">${skill.wantsInReturn.join(' or ')}</span>
          </div>
          <div class="exchange-row">
            <span class="label"><i class="fas fa-calendar-alt"></i> Offering:</span>
            <span class="val">${skill.sessionsOffered}</span>
          </div>
        </div>

        <div class="skill-instructor-footer">
          <div class="instructor-profile">
            <img src="${skill.instructor.avatar}" alt="${skill.instructor.name}" class="avatar-sm">
            <div>
              <h5 class="instructor-name">${skill.instructor.name}</h5>
              <div class="instructor-rating">
                <i class="fas fa-star text-warning"></i>
                <span>${skill.instructor.rating}</span>
                <span class="text-muted">(${skill.instructor.reviews})</span>
              </div>
            </div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="AppUI.openExchangeModal('${skill.instructor.id}', '${skill.title.replace(/'/g, "\\'")}')">
            Request Swap
          </button>
        </div>
      </div>
    `).join('');
  },

  renderMatchmaker() {
    const container = document.getElementById('matchmakerResultsGrid');
    if (!container) return;

    const matches = window.store.calculateMatches();
    container.innerHTML = matches.map(m => `
      <div class="match-detail-card ${m.isDirectReciprocal ? 'reciprocal-highlight' : ''}">
        ${m.isDirectReciprocal ? '<div class="direct-badge"><i class="fas fa-bolt"></i> 100% Reciprocal Match</div>' : ''}
        <div class="match-card-main">
          <div class="peer-profile-header">
            <img src="${m.peer.avatar}" alt="${m.peer.name}" class="avatar-lg">
            <div class="peer-meta">
              <h3>${m.peer.name}</h3>
              <p class="peer-title">${m.peer.title}</p>
              <p class="peer-university"><i class="fas fa-graduation-cap"></i> ${m.peer.university}</p>
              <div class="peer-rating-pill">
                <i class="fas fa-star text-warning"></i> ${m.peer.rating} (${m.peer.reviewCount} reviews) • <span class="text-success"><i class="fas fa-circle text-xs"></i> ${m.peer.status}</span>
              </div>
            </div>
            <div class="match-score-radial">
              <div class="radial-number">${m.score}%</div>
              <div class="radial-text">Mutual Match</div>
            </div>
          </div>

          <p class="peer-bio">"${m.peer.bio}"</p>

          <div class="match-two-way-box">
            <div class="match-box-column">
              <div class="box-header you-get">
                <i class="fas fa-arrow-down"></i> You Learn From ${m.peer.name.split(' ')[0]}
              </div>
              <ul class="skills-list">
                ${m.youLearn.map(s => `<li><i class="fas fa-check-circle text-success"></i> ${s}</li>`).join('')}
              </ul>
            </div>
            <div class="match-swap-divider">
              <i class="fas fa-exchange-alt"></i>
            </div>
            <div class="match-box-column">
              <div class="box-header they-get">
                <i class="fas fa-arrow-up"></i> You Teach ${m.peer.name.split(' ')[0]}
              </div>
              <ul class="skills-list">
                ${m.theyLearn.map(s => `<li><i class="fas fa-check-circle text-primary"></i> ${s}</li>`).join('')}
              </ul>
            </div>
          </div>

          <div class="match-footer-actions">
            <span class="availability-tag"><i class="far fa-clock"></i> Available: ${m.peer.availability}</span>
            <div class="btn-group">
              <button class="btn btn-secondary btn-sm" onclick="AppUI.openDirectChat('${m.peer.id}')">
                <i class="far fa-comment-alt"></i> Send Message
              </button>
              <button class="btn btn-primary btn-sm" onclick="AppUI.openExchangeModal('${m.peer.id}', '${m.youLearn[0]}')">
                <i class="fas fa-paper-plane"></i> Propose Exchange
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  },

  renderSwaps() {
    const listContainer = document.getElementById('swapsListContainer');
    if (!listContainer) return;

    const allReqs = window.store.getExchangeRequests();
    let filtered = [];

    if (this.activeSwapsTab === 'active') {
      filtered = allReqs.filter(r => r.type === 'active');
    } else if (this.activeSwapsTab === 'received') {
      filtered = allReqs.filter(r => r.type === 'received');
    } else if (this.activeSwapsTab === 'sent') {
      filtered = allReqs.filter(r => r.type === 'sent');
    } else if (this.activeSwapsTab === 'completed') {
      filtered = allReqs.filter(r => r.type === 'completed');
    }

    // Update counts on tabs
    const activeCount = allReqs.filter(r => r.type === 'active').length;
    const receivedCount = allReqs.filter(r => r.type === 'received').length;
    const sentCount = allReqs.filter(r => r.type === 'sent').length;
    const completedCount = allReqs.filter(r => r.type === 'completed').length;

    document.getElementById('tabCountActive')?.replaceChildren(document.createTextNode(`(${activeCount})`));
    document.getElementById('tabCountReceived')?.replaceChildren(document.createTextNode(`(${receivedCount})`));
    document.getElementById('tabCountSent')?.replaceChildren(document.createTextNode(`(${sentCount})`));
    document.getElementById('tabCountCompleted')?.replaceChildren(document.createTextNode(`(${completedCount})`));

    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div class="empty-state-lg">
          <i class="fas fa-inbox"></i>
          <h3>No exchanges in "${this.activeSwapsTab}"</h3>
          <p>Explore the marketplace or smart matchmaker to find your next skill swap partner.</p>
          <button class="btn btn-primary mt-3" onclick="window.AppRouter.navigate('browse')">Browse Skills</button>
        </div>
      `;
      return;
    }

    if (this.activeSwapsTab === 'active') {
      listContainer.innerHTML = filtered.map(item => {
        const progressPct = Math.round((item.completedSessions / item.totalSessions) * 100);
        return `
          <div class="swap-item-card active-card">
            <div class="swap-card-left">
              <img src="${item.partnerUser.avatar}" alt="${item.partnerUser.name}" class="avatar-lg">
              <div>
                <h4>${item.partnerUser.name}</h4>
                <p class="text-muted text-sm"><i class="fas fa-university"></i> ${item.partnerUser.university || 'Active Peer'}</p>
                <div class="swap-skills-dual">
                  <span class="badge badge-primary"><i class="fas fa-arrow-up"></i> You teach: ${item.youTeach}</span>
                  <span class="badge badge-success"><i class="fas fa-arrow-down"></i> They teach: ${item.theyTeach}</span>
                </div>
              </div>
            </div>

            <div class="swap-card-middle">
              <div class="progress-bar-wrap">
                <div class="progress-header">
                  <span>Sessions Progress</span>
                  <span class="fw-bold">${item.completedSessions} of ${item.totalSessions} Completed (${progressPct}%)</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill" style="width: ${progressPct}%;"></div>
                </div>
              </div>
              <div class="next-session-info">
                <i class="far fa-clock text-primary"></i> Next Session: <strong>${item.nextSessionDate || 'To be scheduled'}</strong>
              </div>
            </div>

            <div class="swap-card-actions">
              <button class="btn btn-primary btn-sm w-100" onclick="SessionRoom.startSession({ partner: '${item.partnerUser.name}', avatar: '${item.partnerUser.avatar}', topic: '${item.youTeach} & ${item.theyTeach}', roomId: '${item.meetingRoomId}' })">
                <i class="fas fa-video"></i> Enter Room
              </button>
              <button class="btn btn-secondary btn-sm w-100" onclick="AppUI.openDirectChat('${item.partnerUser.id}')">
                <i class="far fa-comment-dots"></i> Message
              </button>
              <button class="btn btn-outline-success btn-sm w-100" onclick="AppUI.completeOneSession('${item.id}')">
                <i class="fas fa-check-circle"></i> Log Session (+25 Karma)
              </button>
            </div>
          </div>
        `;
      }).join('');
    } else if (this.activeSwapsTab === 'received') {
      listContainer.innerHTML = filtered.map(item => `
        <div class="swap-item-card received-card">
          <div class="swap-card-left">
            <img src="${item.fromUser.avatar}" alt="${item.fromUser.name}" class="avatar-lg">
            <div>
              <h4>${item.fromUser.name}</h4>
              <p class="text-warning text-sm"><i class="fas fa-star"></i> ${item.fromUser.rating} Verified Peer Rating</p>
              <p class="text-muted text-xs"><i class="far fa-clock"></i> Received ${item.date}</p>
            </div>
          </div>

          <div class="swap-card-middle">
            <div class="proposal-bubble">
              <div class="proposal-skills">
                <strong>Offers to teach:</strong> <span class="text-success">${item.skillOffered}</span><br>
                <strong>Requests from you:</strong> <span class="text-primary">${item.skillRequested}</span>
              </div>
              <p class="proposal-msg">"${item.message}"</p>
              <div class="proposal-sessions"><i class="fas fa-layer-group"></i> ${item.sessions}</div>
            </div>
          </div>

          <div class="swap-card-actions">
            <button class="btn btn-success btn-sm w-100" onclick="window.store.acceptExchangeRequest('${item.id}')">
              <i class="fas fa-check"></i> Accept Swap (+30 Karma)
            </button>
            <button class="btn btn-outline-danger btn-sm w-100" onclick="window.store.declineExchangeRequest('${item.id}')">
              <i class="fas fa-times"></i> Decline
            </button>
            <button class="btn btn-secondary btn-sm w-100" onclick="AppUI.openDirectChat('${item.fromUser.id}')">
              <i class="far fa-comment"></i> Discuss
            </button>
          </div>
        </div>
      `).join('');
    } else if (this.activeSwapsTab === 'sent') {
      listContainer.innerHTML = filtered.map(item => `
        <div class="swap-item-card sent-card">
          <div class="swap-card-left">
            <img src="${item.toUser.avatar}" alt="${item.toUser.name}" class="avatar-lg">
            <div>
              <h4>${item.toUser.name}</h4>
              <span class="badge badge-warning"><i class="fas fa-hourglass-half"></i> Pending Review</span>
              <p class="text-muted text-xs mt-1">Sent ${item.date}</p>
            </div>
          </div>

          <div class="swap-card-middle">
            <div class="proposal-bubble">
              <div><strong>You offered:</strong> ${item.skillOffered}</div>
              <div><strong>You requested:</strong> ${item.skillRequested}</div>
              <p class="proposal-msg text-muted mt-1">"${item.message}"</p>
            </div>
          </div>

          <div class="swap-card-actions">
            <button class="btn btn-secondary btn-sm w-100" onclick="AppUI.openDirectChat('${item.toUser.id}')">
              <i class="far fa-comment"></i> Send Follow-up
            </button>
          </div>
        </div>
      `).join('');
    } else if (this.activeSwapsTab === 'completed') {
      listContainer.innerHTML = filtered.map(item => `
        <div class="swap-item-card completed-card">
          <div class="swap-card-left">
            <img src="${item.partnerUser.avatar}" alt="${item.partnerUser.name}" class="avatar-lg">
            <div>
              <h4>${item.partnerUser.name}</h4>
              <span class="badge badge-success"><i class="fas fa-award"></i> Successfully Completed</span>
              <p class="text-muted text-xs mt-1">${item.date || 'Completed'}</p>
            </div>
          </div>

          <div class="swap-card-middle">
            <p><strong>Swapped:</strong> ${item.youTeach} ⇄ ${item.theyTeach}</p>
            <div class="rating-stars text-warning my-1">
              ${'<i class="fas fa-star"></i>'.repeat(item.ratingReceived || 5)}
            </div>
            <p class="text-muted text-sm fst-italic">"${item.reviewText || 'Excellent learning partnership!'}"</p>
          </div>

          <div class="swap-card-actions">
            <button class="btn btn-outline-primary btn-sm w-100" onclick="AppUI.openCertificateModal('${item.partnerUser.name}', '${item.youTeach}', '${item.theyTeach}')">
              <i class="fas fa-certificate"></i> View Certificate
            </button>
          </div>
        </div>
      `).join('');
    }
  },

  completeOneSession(activeExchangeId) {
    const updated = window.store.completeSession(activeExchangeId);
    if (updated) {
      this.showToast(`Session logged! +25 Karma Credits awarded.`, 'success');
      this.renderSwaps();
    }
  },

  renderChat() {
    this.renderChatThreads();
    this.renderChatMessages(this.activeChatId);
    this.bindChatEvents();
  },

  renderChatThreads() {
    const threadList = document.getElementById('chatThreadList');
    if (!threadList) return;

    const threads = window.store.getChatThreads();
    threadList.innerHTML = threads.map(th => {
      const lastMsg = th.messages[th.messages.length - 1];
      const isSelected = th.id === this.activeChatId;
      return `
        <div class="chat-thread-item ${isSelected ? 'active' : ''} ${th.unread ? 'unread' : ''}" onclick="AppUI.selectChat('${th.id}')">
          <img src="${th.avatar}" alt="${th.userName}" class="avatar-md">
          <div class="thread-info">
            <div class="thread-name-row">
              <h5 class="thread-name">${th.userName}</h5>
              <span class="thread-time">${th.lastUpdated}</span>
            </div>
            <div class="thread-topic">${th.skillSwapTopic}</div>
            <div class="thread-preview">${lastMsg ? (lastMsg.sender === 'me' ? 'You: ' : '') + lastMsg.text : 'Start chatting...'}</div>
          </div>
        </div>
      `;
    }).join('');
  },

  selectChat(chatId) {
    this.activeChatId = chatId;
    const chat = window.store.getChat(chatId);
    if (chat) chat.unread = false;
    this.renderChatThreads();
    this.renderChatMessages(chatId);
  },

  renderChatMessages(chatId) {
    const chat = window.store.getChat(chatId);
    const container = document.getElementById('chatMessagesBox');
    const headerTitle = document.getElementById('activeChatPartnerName');
    const headerTopic = document.getElementById('activeChatPartnerTopic');
    const headerAvatar = document.getElementById('activeChatPartnerAvatar');

    if (!container || !chat) return;

    if (headerTitle) headerTitle.textContent = chat.userName;
    if (headerTopic) headerTopic.textContent = chat.skillSwapTopic;
    if (headerAvatar) headerAvatar.src = chat.avatar;

    container.innerHTML = chat.messages.map(m => `
      <div class="message-bubble ${m.sender === 'me' ? 'sent' : 'received'}">
        <div class="bubble-content">
          <p>${m.text}</p>
          <span class="msg-timestamp">${m.time}</span>
        </div>
      </div>
    `).join('');

    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
  },

  bindChatEvents() {
    const form = document.getElementById('chatSendForm');
    const input = document.getElementById('chatMessageInput');

    if (form && !form.dataset.bound) {
      form.dataset.bound = 'true';
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
          window.store.sendChatMessage(this.activeChatId, text);
          input.value = '';
        }
      });
    }
  },

  openDirectChat(userId) {
    let thread = window.store.getChatThreads().find(t => t.userId === userId || t.id === userId);
    if (!thread) {
      thread = window.store.sendChatMessage(userId, 'Hi there! Excited to explore a skill exchange with you.');
    }
    this.activeChatId = thread.id;
    window.AppRouter.navigate('messages');
  },

  renderProfile() {
    const user = window.store.getUser();
    if (!user) return;

    // Stats
    document.getElementById('profRatingVal')?.replaceChildren(document.createTextNode(user.rating.toFixed(2)));
    document.getElementById('profReviewCount')?.replaceChildren(document.createTextNode(`(${user.reviewCount} reviews)`));
    document.getElementById('profHoursTaught')?.replaceChildren(document.createTextNode(user.hoursTaught));
    document.getElementById('profHoursLearned')?.replaceChildren(document.createTextNode(user.hoursLearned));
    document.getElementById('profCompletedCount')?.replaceChildren(document.createTextNode(user.completedExchanges));

    // Bio & University
    const bioEl = document.getElementById('profBioText');
    if (bioEl) bioEl.textContent = user.bio;
    const uniEl = document.getElementById('profUniversityText');
    if (uniEl) uniEl.textContent = user.university;

    // Badges
    const badgesContainer = document.getElementById('profBadgesGrid');
    if (badgesContainer) {
      badgesContainer.innerHTML = (user.badges || []).map(b => `
        <div class="badge-item-card">
          <div class="badge-icon" style="color: ${b.color}; background-color: ${b.color}15;">
            <i class="fas ${b.icon}"></i>
          </div>
          <div>
            <h5>${b.name}</h5>
            <p>${b.desc}</p>
          </div>
        </div>
      `).join('');
    }

    // Skills Offered
    const offeredContainer = document.getElementById('profSkillsOfferedList');
    if (offeredContainer) {
      offeredContainer.innerHTML = (user.skillsOffered || []).map(s => `
        <div class="user-skill-pill">
          <div class="skill-pill-main">
            <span class="skill-pill-title">${s.title}</span>
            <span class="skill-level-tag">${s.level}</span>
          </div>
          <div class="skill-pill-actions">
            <span class="text-muted text-xs">${s.hoursShared || 0} hrs shared</span>
            <button class="btn-remove-skill" onclick="window.store.removeSkillOffered('${s.id}')" title="Remove">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      `).join('');
    }

    // Skills Wanted
    const wantedContainer = document.getElementById('profSkillsWantedList');
    if (wantedContainer) {
      wantedContainer.innerHTML = (user.skillsWanted || []).map(s => `
        <div class="user-skill-pill wanted-pill">
          <div class="skill-pill-main">
            <span class="skill-pill-title">${s.title}</span>
            <span class="skill-priority-tag priority-${s.priority ? s.priority.toLowerCase() : 'medium'}">${s.priority} Priority</span>
          </div>
          <div class="skill-pill-actions">
            <span class="text-muted text-xs">Target: ${s.targetLevel}</span>
            <button class="btn-remove-skill" onclick="window.store.removeSkillWanted('${s.id}')" title="Remove">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      `).join('');
    }

    // Reviews
    const reviewsContainer = document.getElementById('profReviewsList');
    if (reviewsContainer) {
      const revs = window.store.getReviews();
      reviewsContainer.innerHTML = revs.map(r => `
        <div class="review-card">
          <div class="review-header">
            <img src="${r.avatar}" alt="${r.author}" class="avatar-sm">
            <div>
              <h5>${r.author}</h5>
              <div class="review-stars text-warning">
                ${'<i class="fas fa-star"></i>'.repeat(r.rating)}
              </div>
            </div>
            <span class="review-date">${r.date}</span>
          </div>
          <div class="review-swapped-topic"><i class="fas fa-sync-alt"></i> ${r.skillSwapped}</div>
          <p class="review-comment">"${r.comment}"</p>
        </div>
      `).join('');
    }
  },

  renderSettings() {
    const user = window.store.getUser();
    if (!user) return;

    const nameInput = document.getElementById('settingsUserName');
    const titleInput = document.getElementById('settingsUserTitle');
    const uniInput = document.getElementById('settingsUserUniversity');
    const bioInput = document.getElementById('settingsUserBio');

    if (nameInput) nameInput.value = user.name;
    if (titleInput) titleInput.value = user.title;
    if (uniInput) uniInput.value = user.university;
    if (bioInput) bioInput.value = user.bio;
  },

  // Modal Openers
  openExchangeModal(targetUserId, requestedSkillTitle) {
    const user = window.store.getUser();
    const partner = window.store.getCommunityUsers().find(u => u.id === targetUserId);

    const partnerNameEl = document.getElementById('modalPartnerName');
    const partnerAvatarEl = document.getElementById('modalPartnerAvatar');
    const targetInput = document.getElementById('exchangeTargetUserId');
    const requestedInput = document.getElementById('exchangeSkillRequested');
    const offeredSelect = document.getElementById('exchangeSkillOfferedSelect');

    if (partnerNameEl) partnerNameEl.textContent = partner ? partner.name : 'Peer Member';
    if (partnerAvatarEl) partnerAvatarEl.src = partner ? partner.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80';
    if (targetInput) targetInput.value = targetUserId;
    if (requestedInput) requestedInput.value = requestedSkillTitle || (partner ? partner.skillsOffered[0] : 'Skill');

    // Populate user's offered skills into dropdown
    if (offeredSelect) {
      offeredSelect.innerHTML = (user.skillsOffered || []).map(s => `
        <option value="${s.title}">${s.title} (${s.level})</option>
      `).join('');
    }

    const modal = document.getElementById('exchangeModal');
    if (modal) modal.classList.add('active');
  },

  openCertificateModal(partnerName, yourSkill, theirSkill) {
    const certModal = document.getElementById('certificateModal');
    if (!certModal) return;

    document.getElementById('certStudentName')?.replaceChildren(document.createTextNode(window.store.getUser().name));
    document.getElementById('certPartnerName')?.replaceChildren(document.createTextNode(partnerName));
    document.getElementById('certSkillPair')?.replaceChildren(document.createTextNode(`${yourSkill} & ${theirSkill}`));
    document.getElementById('certDate')?.replaceChildren(document.createTextNode(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })));

    certModal.classList.add('active');
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type} animate-slide-in`;

    const iconMap = {
      success: 'fa-check-circle',
      info: 'fa-info-circle',
      warning: 'fa-exclamation-triangle',
      error: 'fa-times-circle'
    };

    toast.innerHTML = `
      <i class="fas ${iconMap[type] || 'fa-info-circle'}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }
};

window.AppUI = AppUI;

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  AppUI.init();
  SessionRoom.init();
  AppRouter.init();
});
