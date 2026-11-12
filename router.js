/**
 * SkillBridge - SPA View Router
 * Handles client-side view switching with browser history and hash navigation
 */

const AppRouter = {
  routes: ['dashboard', 'browse', 'matchmaker', 'swaps', 'messages', 'room', 'profile', 'settings'],
  currentRoute: 'dashboard',

  init() {
    window.addEventListener('hashchange', () => this.handleHashChange());
    // Initial check
    this.handleHashChange();
  },

  handleHashChange() {
    const hash = window.location.hash.replace('#/', '').replace('#', '') || 'dashboard';
    const route = this.routes.includes(hash) ? hash : 'dashboard';
    this.navigate(route, false);
  },

  navigate(route, updateHash = true) {
    if (!this.routes.includes(route)) route = 'dashboard';
    this.currentRoute = route;

    if (updateHash) {
      window.location.hash = '#/' + route;
    }

    // Toggle active view container
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const activeSec = document.getElementById(`view-${route}`);
    if (activeSec) {
      activeSec.classList.add('active');
    }

    // Update sidebar navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
      const target = link.getAttribute('data-view');
      link.classList.toggle('active', target === route);
    });

    // Notify UI to render any dynamic view-specific components
    if (window.AppUI) {
      window.AppUI.onViewChange(route);
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

window.AppRouter = AppRouter;
