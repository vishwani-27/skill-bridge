/**
 * SkillBridge - Virtual Session Room
 * Interactive peer-to-peer learning room with camera/mic toggles, timer, live notes, and session completion
 */

const SessionRoom = {
  activeSession: null,
  timerInterval: null,
  secondsElapsed: 0,
  isTimerRunning: false,
  isMuted: false,
  isVideoOff: false,
  isScreenSharing: false,

  init() {
    this.bindEvents();
  },

  startSession(sessionData) {
    this.activeSession = sessionData || {
      partner: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      topic: '3D Blender Modeling & Tailwind CSS Exchange',
      roomId: 'room_active'
    };

    // Update room UI
    const partnerNameEl = document.getElementById('roomPartnerName');
    const partnerRoleEl = document.getElementById('roomPartnerRole');
    const roomTopicEl = document.getElementById('roomTopicTitle');
    const peerAvatarEl = document.getElementById('roomPeerAvatar');

    if (partnerNameEl) partnerNameEl.textContent = this.activeSession.partner;
    if (partnerRoleEl) partnerRoleEl.textContent = 'Exchange Partner • Connected';
    if (roomTopicEl) roomTopicEl.textContent = this.activeSession.topic;
    if (peerAvatarEl) peerAvatarEl.src = this.activeSession.avatar;

    // Reset and start timer
    this.resetTimer();
    this.startTimer();

    // Reset controls
    this.isMuted = false;
    this.isVideoOff = false;
    this.isScreenSharing = false;
    this.updateControlsUI();

    // Switch to room view
    if (window.AppRouter) {
      window.AppRouter.navigate('room');
    }
  },

  bindEvents() {
    // Mic Toggle
    const micBtn = document.getElementById('btnToggleMic');
    if (micBtn) {
      micBtn.addEventListener('click', () => {
        this.isMuted = !this.isMuted;
        micBtn.classList.toggle('control-off', this.isMuted);
        micBtn.innerHTML = this.isMuted
          ? '<i class="fas fa-microphone-slash"></i><span>Unmute</span>'
          : '<i class="fas fa-microphone"></i><span>Mute</span>';
        AppUI.showToast(this.isMuted ? 'Microphone muted' : 'Microphone unmuted', 'info');
      });
    }

    // Video Toggle
    const vidBtn = document.getElementById('btnToggleVideo');
    if (vidBtn) {
      vidBtn.addEventListener('click', () => {
        this.isVideoOff = !this.isVideoOff;
        vidBtn.classList.toggle('control-off', this.isVideoOff);
        vidBtn.innerHTML = this.isVideoOff
          ? '<i class="fas fa-video-slash"></i><span>Start Video</span>'
          : '<i class="fas fa-video"></i><span>Stop Video</span>';

        const selfVid = document.getElementById('selfVideoPlaceholder');
        if (selfVid) {
          selfVid.style.opacity = this.isVideoOff ? '0.2' : '1';
        }
        AppUI.showToast(this.isVideoOff ? 'Camera turned off' : 'Camera turned on', 'info');
      });
    }

    // Screen Share Toggle
    const shareBtn = document.getElementById('btnToggleShare');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        this.isScreenSharing = !this.isScreenSharing;
        shareBtn.classList.toggle('control-active', this.isScreenSharing);
        shareBtn.innerHTML = this.isScreenSharing
          ? '<i class="fas fa-desktop text-success"></i><span>Stop Share</span>'
          : '<i class="fas fa-desktop"></i><span>Share Screen</span>';
        AppUI.showToast(this.isScreenSharing ? 'Screen sharing active (Mock)' : 'Screen share ended', 'info');
      });
    }

    // Timer Controls
    const pauseTimerBtn = document.getElementById('btnPauseTimer');
    if (pauseTimerBtn) {
      pauseTimerBtn.addEventListener('click', () => {
        if (this.isTimerRunning) {
          this.pauseTimer();
          pauseTimerBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
          this.startTimer();
          pauseTimerBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
      });
    }

    // Download Notes
    const downloadNotesBtn = document.getElementById('btnDownloadNotes');
    if (downloadNotesBtn) {
      downloadNotesBtn.addEventListener('click', () => {
        const text = document.getElementById('sessionNotesArea')?.value || '';
        if (!text.trim()) {
          AppUI.showToast('Please type some notes first!', 'warning');
          return;
        }
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SkillBridge-Session-Notes-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        AppUI.showToast('Notes downloaded successfully!', 'success');
      });
    }

    // End Session Button
    const endSessionBtn = document.getElementById('btnEndSession');
    if (endSessionBtn) {
      endSessionBtn.addEventListener('click', () => {
        this.openCompletionModal();
      });
    }

    // Complete Modal submit
    const completeForm = document.getElementById('completeSessionForm');
    if (completeForm) {
      completeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.finishSession();
      });
    }
  },

  updateControlsUI() {
    const micBtn = document.getElementById('btnToggleMic');
    const vidBtn = document.getElementById('btnToggleVideo');
    const shareBtn = document.getElementById('btnToggleShare');

    if (micBtn) {
      micBtn.classList.remove('control-off');
      micBtn.innerHTML = '<i class="fas fa-microphone"></i><span>Mute</span>';
    }
    if (vidBtn) {
      vidBtn.classList.remove('control-off');
      vidBtn.innerHTML = '<i class="fas fa-video"></i><span>Stop Video</span>';
    }
    if (shareBtn) {
      shareBtn.classList.remove('control-active');
      shareBtn.innerHTML = '<i class="fas fa-desktop"></i><span>Share Screen</span>';
    }
  },

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.isTimerRunning = true;
    this.timerInterval = setInterval(() => {
      this.secondsElapsed++;
      this.renderTimer();
    }, 1000);
  },

  pauseTimer() {
    this.isTimerRunning = false;
    clearInterval(this.timerInterval);
  },

  resetTimer() {
    this.pauseTimer();
    this.secondsElapsed = 0;
    this.renderTimer();
  },

  renderTimer() {
    const el = document.getElementById('sessionTimerDisplay');
    if (!el) return;
    const mins = Math.floor(this.secondsElapsed / 60).toString().padStart(2, '0');
    const secs = (this.secondsElapsed % 60).toString().padStart(2, '0');
    el.textContent = `${mins}:${secs}`;
  },

  openCompletionModal() {
    const modal = document.getElementById('completeSessionModal');
    if (modal) {
      const partnerSpan = document.getElementById('completePartnerName');
      if (partnerSpan && this.activeSession) {
        partnerSpan.textContent = this.activeSession.partner;
      }
      modal.classList.add('active');
    }
  },

  finishSession() {
    this.pauseTimer();

    // Read rating and feedback
    const ratingEl = document.querySelector('input[name="sessionRating"]:checked');
    const rating = ratingEl ? ratingEl.value : 5;
    const feedbackText = document.getElementById('sessionFeedbackText')?.value || 'Great productive session!';

    // Find active exchange and complete session
    const activeReqs = window.store.getExchangeRequests().filter(r => r.type === 'active');
    if (activeReqs.length > 0) {
      window.store.completeSession(activeReqs[0].id);
    } else {
      window.store.addKarmaCredits(25, `Completed skill swap session with ${this.activeSession ? this.activeSession.partner : 'Peer'}`);
    }

    // Add review
    if (this.activeSession) {
      window.store.addReview(
        this.activeSession.partner,
        rating,
        feedbackText,
        this.activeSession.topic
      );
    }

    // Close modal
    document.getElementById('completeSessionModal')?.classList.remove('active');

    // Confetti effect!
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    AppUI.showToast('🎉 Session completed! +25 Karma Credits added to your balance.', 'success');

    // Navigate back to dashboard after brief celebration
    setTimeout(() => {
      window.AppRouter.navigate('dashboard');
    }, 1200);
  }
};

window.SessionRoom = SessionRoom;
