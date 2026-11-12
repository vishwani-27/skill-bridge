# 🎓 SkillBridge - Peer-to-Peer Skill Exchange Platform
> **Web Technologies Project** • A fully responsive, modern decentralized peer learning and skill swap dashboard.

![SkillBridge Banner](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Project Overview
**SkillBridge** is a decentralized, credit-based skill exchange platform engineered for universities and professional communities. Instead of paying monetary fees for learning, users exchange their skills directly:
- **Alex teaches React 19** to Priya, and **Priya teaches Machine Learning with PyTorch** to Alex.
- Both users build up their **Karma Credits**, earn **Badges**, exchange reviews, and gain **Verifiable Exchange Certificates**.

---

## 🚀 How to Open and Run from VS Code

### Method 1: Live Server (Recommended for Instant Preview)
1. Open **Visual Studio Code**.
2. Click **File** > **Open Folder...** (or press `Ctrl + K, Ctrl + O`).
3. Select this folder:
   ```text
   C:\Users\vishw\.gemini\antigravity\scratch\skill-exchange-platform
   ```
4. Right-click [`index.html`](file:///C:/Users/vishw/.gemini/antigravity/scratch/skill-exchange-platform/index.html) and select **"Open with Live Server"** (or click **"Go Live"** on the bottom right status bar).
5. The application will open automatically in your browser at `http://127.0.0.1:5500`.

---

### Method 2: Node.js Local Server
This project includes a built-in, zero-dependency Node.js HTTP web server.

1. Open the integrated terminal in VS Code (`Ctrl + ~`).
2. Run either of these commands:
   ```bash
   node server.js
   ```
   *or*
   ```bash
   npm start
   ```
3. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

---

### Method 3: Direct Browser Launch
Simply navigate to the project directory in Windows File Explorer and double-click [`index.html`](file:///C:/Users/vishw/.gemini/antigravity/scratch/skill-exchange-platform/index.html). It runs entirely in modern browsers with zero external installation.

---

## 💻 Tech Stack & Web Technologies Used

| Layer | Technologies |
| :--- | :--- |
| **Markup & Semantics** | HTML5 (Semantic tags: `<header>`, `<nav>`, `<aside>`, `<main>`, `<section>`, `<dialog>`) |
| **Styling & Design** | CSS3 (CSS Variables / Tokens, Flexbox, Grid, Glassmorphism, Light/Dark Modes, Keyframe Animations) |
| **Client-Side Logic** | Modern JavaScript (ES6+ Classes, Async Event Bus, Hash-based Router, Blob File Export) |
| **Data & State** | Browser `localStorage` (Reactive Store with initial seed data & reset capabilities) |
| **Data Visualization** | Chart.js 4.4.1 (Interactive Bar & Doughnut charts with dark/light mode synchronization) |
| **Icons & Gamification** | Font Awesome 6.5 & Canvas-Confetti 1.9.2 |
| **Local Server** | Node.js Built-in HTTP Server (`server.js`) |

---

## 📂 Project Directory Structure

```text
skill-exchange-platform/
├── .vscode/
│   ├── settings.json       # Live Server port & editor formatting configuration
│   ├── launch.json         # Debug configuration for Chrome & Node.js
│   └── extensions.json     # Recommended VS Code extensions (Live Server)
├── index.html              # Main Single Page Application shell & layout
├── server.js               # Zero-dependency Node.js HTTP web server
├── package.json            # Project manifest & npm scripts
├── README.md               # Complete documentation & project viva guide
├── css/
│   ├── style.css           # Design tokens, CSS variables, typography & layout hierarchy
│   ├── dashboard.css       # Metrics cards, hero banner, activity feed & chart wrappers
│   ├── components.css      # Marketplace cards, matchmaker cards, chat & virtual room styles
│   └── responsive.css      # Tablet and mobile breakpoints
└── js/
    ├── mockData.js         # Realistic seed data (users, skills, requests, chats, reviews)
    ├── store.js            # Reactive LocalStorage manager & matching algorithm
    ├── charts.js           # Chart.js analytics for hours exchanged & categories
    ├── router.js           # Client-side hash routing between views
    ├── sessionRoom.js      # Virtual 1-on-1 collaborative study room simulator
    └── app.js              # Application controller, modal handling & UI binding
```

---

## 🎯 Key Application Views & Features

### 1. 📊 Interactive Dashboard (`#/dashboard`)
- **Hero Welcome Card:** Personalized greeting with dynamic time detection, karma overview, and quick-action shortcuts.
- **4 Key Metric Cards:** Active Exchanges, Skills Offered, Skills Learning, and Reputation Score.
- **Upcoming Sessions Widget:** Countdown timers and 1-click **"Enter Room"** shortcuts.
- **Interactive Analytics:**
  - Hours Taught vs. Learned multi-bar comparison chart.
  - Skill domains doughnut distribution chart.
- **Top Smart Matches:** Real-time algorithmic compatibility preview.

### 2. 🔍 Skill Marketplace (`#/browse`)
- Real-time search by keywords, topics, instructors, or tags.
- Multi-category pills: *Programming, Data & AI, Languages, Design & 3D, Soft Skills, Music*.
- Detailed skill cards with instructor rating, availability, and an instant **"Request Swap"** modal.

### 3. 🧠 AI Matchmaker Engine (`#/matchmaker`)
- Calculates bidirectional compatibility scores between your offered skills and what peers wish to learn.
- Highlights **100% Reciprocal Swaps** (Direct two-way matching).
- Displays clear side-by-side comparison ("You Learn" ⇄ "They Learn").

### 4. 🔄 Exchange Requests Manager (`#/swaps`)
- **Active Swaps:** Progress tracker (e.g. 3 of 5 sessions complete) with direct room launcher.
- **Received Proposals:** 1-click **Accept (+30 Karma)** or **Decline**.
- **Sent Proposals:** Track pending approval status.
- **Completed History:** View peer ratings and click **"View Certificate"** to generate an official printable completion award.

### 5. 💬 Real-Time Chat & Collaboration (`#/messages`)
- Split-screen interface with active conversation threads.
- Sends instant messages with timestamp.
- **Simulated Peer Response:** Demonstrates real-time conversation flow with automatic smart mentor replies.

### 6. 🎥 Virtual Study & Exchange Room (`#/room`)
- Interactive 1-on-1 video call interface (Camera toggle, Microphone toggle, Screen Share mockup).
- **Live Session Stopwatch:** Counts elapsed study time (Pause / Resume / Reset).
- **Collaborative Scratchpad:** Built-in code/notes editor with **"Save Notes (.txt)"** file download feature using HTML5 Blobs.
- **End & Complete Session:** Triggers confetti animation, awards **+25 Karma Credits**, and prompts peer review.

### 7. 👤 User Portfolio & Badges (`#/profile`)
- Displays verified badges: *Top Mentor, Polymath, Verified Peer, Fast Responder*.
- Manage skills you teach and skills you want to learn with custom modal popups.
- Verified peer testimonials and rating breakdown.

### 8. ⚙️ Platform Settings & Dark Mode (`#/settings`)
- Smooth Dark/Light mode toggle powered by CSS custom properties.
- Edit user profile details (persists to `localStorage`).
- **Reset Demo Data** button to quickly restore initial seed state anytime.

---

## 🎓 Academic Viva Questions & Answers

**Q1: How is data persisted without a dedicated SQL/NoSQL database?**  
> *Answer:* The project utilizes the HTML5 **Web Storage API (`localStorage`)** managed through a central `SkillBridgeStore` class. All additions (new skills, swap proposals, accepted sessions, chat messages, and karma credits) are serialized to JSON and updated reactively. A demo reset mechanism allows evaluators to reset sample data anytime.

**Q2: How does the Smart Matching Algorithm function?**  
> *Answer:* The algorithm in [`store.js`](file:///C:/Users/vishw/.gemini/antigravity/scratch/skill-exchange-platform/js/store.js) inspects the current user's `skillsOffered` and `skillsWanted` arrays against the community database. It searches for reciprocal intersection: if Peer A offers what Alex wants, and Alex offers what Peer A wants, it assigns a 90%+ compatibility score and flags it as a "Direct Reciprocal Swap".

**Q3: How does client-side routing work without page reloads?**  
> *Answer:* We use a hash-based SPA router in [`router.js`](file:///C:/Users/vishw/.gemini/antigravity/scratch/skill-exchange-platform/js/router.js) that listens to the `window.onhashchange` event. Views are contained inside `<section class="view-section">` elements, and only the active route is displayed, providing instant 0ms latency transitions.

**Q4: How does the application handle responsiveness and dark mode?**  
> *Answer:* Responsive styling is implemented using CSS3 Grid and Flexbox with media queries across breakpoints (1200px, 992px, 640px). Dark and light themes use CSS Custom Properties (`--bg-primary`, `--bg-surface`, `--text-primary`), dynamically switching via the `data-theme` attribute on the `<html>` root tag.
