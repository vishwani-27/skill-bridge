/**
 * SkillBridge - Charts and Analytics
 * Renders interactive learning statistics and domain distributions using Chart.js
 */

const SkillCharts = {
  hoursChartInstance: null,
  categoryChartInstance: null,

  init() {
    this.renderHoursChart();
    this.renderCategoryChart();

    // Re-render when theme changes to adapt grid lines and font colors
    window.store.subscribe((event) => {
      if (event === 'theme:changed') {
        this.updateThemeColors();
      }
    });
  },

  isDarkMode() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  },

  renderHoursChart() {
    const ctx = document.getElementById('hoursExchangeChart');
    if (!ctx) return;

    if (this.hoursChartInstance) {
      this.hoursChartInstance.destroy();
    }

    const isDark = this.isDarkMode();
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';

    this.hoursChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
        datasets: [
          {
            label: 'Hours Taught',
            data: [6, 8, 12, 14, 11, 17],
            backgroundColor: 'rgba(99, 102, 241, 0.85)',
            borderColor: '#6366f1',
            borderRadius: 6,
            borderWidth: 1,
            barPercentage: 0.65
          },
          {
            label: 'Hours Learned',
            data: [4, 6, 8, 11, 9, 14],
            backgroundColor: 'rgba(16, 185, 129, 0.85)',
            borderColor: '#10b981',
            borderRadius: 6,
            borderWidth: 1,
            barPercentage: 0.65
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: textColor,
              font: { family: "'Plus Jakarta Sans', sans-serif", weight: '600', size: 12 },
              usePointStyle: true,
              boxWidth: 8
            }
          },
          tooltip: {
            backgroundColor: isDark ? '#1e293b' : '#0f172a',
            titleColor: '#fff',
            bodyColor: '#cbd5e1',
            padding: 12,
            cornerRadius: 8,
            boxPadding: 4
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: textColor, font: { family: "'Plus Jakarta Sans', sans-serif" } }
          },
          y: {
            grid: { color: gridColor },
            ticks: {
              color: textColor,
              font: { family: "'Plus Jakarta Sans', sans-serif" },
              stepSize: 5
            },
            title: {
              display: true,
              text: 'Hours',
              color: textColor,
              font: { size: 11, weight: '500' }
            }
          }
        }
      }
    });
  },

  renderCategoryChart() {
    const ctx = document.getElementById('categoryPieChart');
    if (!ctx) return;

    if (this.categoryChartInstance) {
      this.categoryChartInstance.destroy();
    }

    const isDark = this.isDarkMode();
    const textColor = isDark ? '#94a3b8' : '#64748b';

    this.categoryChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Web & Software', 'AI & Data Science', 'Languages', 'Design & 3D', 'Soft Skills'],
        datasets: [
          {
            data: [42, 22, 16, 12, 8],
            backgroundColor: [
              '#6366f1', // Indigo
              '#06b6d4', // Cyan
              '#10b981', // Emerald
              '#f59e0b', // Amber
              '#ec4899'  // Pink
            ],
            borderWidth: 0,
            hoverOffset: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: textColor,
              font: { family: "'Plus Jakarta Sans', sans-serif", weight: '500', size: 11 },
              usePointStyle: true,
              boxWidth: 8,
              padding: 12
            }
          },
          tooltip: {
            backgroundColor: isDark ? '#1e293b' : '#0f172a',
            callbacks: {
              label: (context) => ` ${context.label}: ${context.raw}%`
            }
          }
        }
      }
    });
  },

  updateThemeColors() {
    this.renderHoursChart();
    this.renderCategoryChart();
  }
};

window.SkillCharts = SkillCharts;
