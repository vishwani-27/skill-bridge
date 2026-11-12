/**
 * SkillBridge - Mock Data Store
 * Provides rich, realistic initial seed data for the Skill Exchange Platform.
 */

const INITIAL_DATA = {
  currentUser: {
    id: 'user_alex',
    name: 'Alex Rivera',
    handle: '@alexrivera',
    title: 'Full-Stack Developer & UI/UX Designer',
    university: 'Stanford University (CS Dept)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    bio: 'Passionate computer science student specializing in modern web technologies. Looking to swap frontend/backend engineering knowledge for conversational Spanish, Machine Learning, and 3D modeling.',
    credits: 240,
    rating: 4.96,
    reviewCount: 42,
    hoursTaught: 58,
    hoursLearned: 44,
    completedExchanges: 26,
    badges: [
      { id: 'b1', name: 'Top Mentor', icon: 'fa-award', color: '#f59e0b', desc: 'Rated 4.9+ across 20+ peer exchanges' },
      { id: 'b2', name: 'Polymath', icon: 'fa-brain', color: '#8b5cf6', desc: 'Actively learning skills in 3+ distinct domains' },
      { id: 'b3', name: 'Verified Peer', icon: 'fa-check-circle', color: '#10b981', desc: 'Academic credentials verified' },
      { id: 'b4', name: 'Fast Responder', icon: 'fa-bolt', color: '#3b82f6', desc: 'Responds within 30 minutes' }
    ],
    skillsOffered: [
      { id: 'sk_off_1', title: 'React 19 & Next.js', category: 'Programming', level: 'Expert', hoursShared: 28, endorsements: 34 },
      { id: 'sk_off_2', title: 'UI/UX Design with Figma', category: 'Design', level: 'Advanced', hoursShared: 16, endorsements: 22 },
      { id: 'sk_off_3', title: 'Node.js & REST APIs', category: 'Programming', level: 'Advanced', hoursShared: 14, endorsements: 19 },
      { id: 'sk_off_4', title: 'Tailwind CSS & Responsive Web', category: 'Programming', level: 'Expert', hoursShared: 20, endorsements: 27 },
      { id: 'sk_off_5', title: 'Modern JavaScript (ES6+)', category: 'Programming', level: 'Expert', hoursShared: 32, endorsements: 41 }
    ],
    skillsWanted: [
      { id: 'sk_want_1', title: 'Conversational Spanish', category: 'Languages', targetLevel: 'Intermediate', priority: 'High' },
      { id: 'sk_want_2', title: 'Machine Learning & PyTorch', category: 'Data & AI', targetLevel: 'Intermediate', priority: 'High' },
      { id: 'sk_want_3', title: '3D Blender Character Modeling', category: 'Creative & 3D', targetLevel: 'Beginner', priority: 'Medium' },
      { id: 'sk_want_4', title: 'Public Speaking & Presentation', category: 'Soft Skills', targetLevel: 'Advanced', priority: 'Medium' }
    ]
  },

  communityUsers: [
    {
      id: 'user_priya',
      name: 'Priya Sharma',
      title: 'Machine Learning Researcher & Data Scientist',
      university: 'Carnegie Mellon University',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
      rating: 4.98,
      reviewCount: 36,
      credits: 310,
      bio: 'PhD candidate working on NLP and Deep Learning. Love teaching Python and mathematical concepts behind neural networks. Eager to level up my web frontend skills!',
      skillsOffered: ['Machine Learning & PyTorch', 'Data Analysis with Pandas', 'Python for AI', 'Statistical Modeling'],
      skillsWanted: ['React 19 & Next.js', 'UI/UX Design with Figma', 'Tailwind CSS'],
      availability: 'Weeknights & Saturdays',
      status: 'online'
    },
    {
      id: 'user_marcus',
      name: 'Marcus Vance',
      title: '3D Generalist & Game Environment Artist',
      university: 'Vancouver Film School',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      rating: 4.92,
      reviewCount: 29,
      credits: 190,
      bio: '5+ years creating 3D assets in Blender and Unreal Engine 5. Wanting to build my own interactive portfolio website using modern web tech.',
      skillsOffered: ['3D Blender Character Modeling', 'Unreal Engine 5 Basics', 'Substance Painter Texturing'],
      skillsWanted: ['Tailwind CSS & Responsive Web', 'Modern JavaScript (ES6+)', 'Node.js & REST APIs'],
      availability: 'Weekends (Flexible)',
      status: 'offline'
    },
    {
      id: 'user_elena',
      name: 'Elena Rostova',
      title: 'Native Spanish Instructor & Cultural Consultant',
      university: 'University of Salamanca / UCLA',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
      rating: 5.0,
      reviewCount: 51,
      credits: 420,
      bio: 'Bilingual certified tutor passionate about immersive communicative language teaching. Currently learning web development to create language tools.',
      skillsOffered: ['Conversational Spanish', 'Spanish Grammar & Literature', 'Latin Culture & Accent Coaching'],
      skillsWanted: ['React 19 & Next.js', 'Public Speaking & Presentation', 'UI/UX Design with Figma'],
      availability: 'Mon, Wed, Fri Mornings',
      status: 'online'
    },
    {
      id: 'user_david',
      name: 'David Kim',
      title: 'Cloud DevOps Engineer & Docker Specialist',
      university: 'Georgia Tech',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      rating: 4.88,
      reviewCount: 24,
      credits: 175,
      bio: 'Specializing in containerization, CI/CD pipelines, and cloud infrastructure on AWS. Wanting to improve my UI prototyping and TypeScript skills.',
      skillsOffered: ['Docker & Kubernetes', 'AWS Cloud Architecture', 'Linux Shell Scripting'],
      skillsWanted: ['Modern JavaScript (ES6+)', 'UI/UX Design with Figma'],
      availability: 'Tues & Thurs Evenings',
      status: 'online'
    },
    {
      id: 'user_sarah',
      name: 'Sarah Jenkins',
      title: 'Senior Product Strategist & Keynote Speaker',
      university: 'Northwestern University',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
      rating: 4.95,
      reviewCount: 47,
      credits: 360,
      bio: 'TEDx speaker and tech PM coach. I coach engineers on confident public speaking, pitch decks, and leadership communication.',
      skillsOffered: ['Public Speaking & Presentation', 'Product Pitching & Storytelling', 'Product Management Roadmap'],
      skillsWanted: ['Data Analysis with Pandas', 'Modern JavaScript (ES6+)'],
      availability: 'Sunday Afternoons',
      status: 'offline'
    },
    {
      id: 'user_liam',
      name: 'Liam Chen',
      title: 'Music Producer & Multi-Instrumentalist',
      university: 'Berklee College of Music',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80',
      rating: 4.89,
      reviewCount: 21,
      credits: 150,
      bio: 'Producer with millions of streams. I teach fingerstyle acoustic guitar, Logic Pro production, and audio mixing.',
      skillsOffered: ['Fingerstyle Acoustic Guitar', 'Logic Pro Audio Engineering', 'Music Theory Basics'],
      skillsWanted: ['Node.js & REST APIs', 'React 19 & Next.js'],
      availability: 'Weekday Afternoons',
      status: 'online'
    }
  ],

  marketplaceSkills: [
    {
      id: 'skill_1',
      title: 'Machine Learning Fundamentals & PyTorch',
      category: 'Data & AI',
      level: 'Intermediate',
      instructor: {
        id: 'user_priya',
        name: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
        university: 'Carnegie Mellon University',
        rating: 4.98,
        reviews: 36
      },
      wantsInReturn: ['React 19 & Next.js', 'UI/UX Design with Figma'],
      description: 'Master tensor operations, gradient descent, building multi-layer perceptrons, convolutional neural networks, and deploying models with PyTorch.',
      sessionsOffered: '4 sessions (1 hr each)',
      badge: 'High Match (98%)',
      badgeColor: '#10b981',
      tags: ['PyTorch', 'Python', 'Deep Learning', 'Neural Networks']
    },
    {
      id: 'skill_2',
      title: 'Conversational Spanish & Fluency Practice',
      category: 'Languages',
      level: 'All Levels',
      instructor: {
        id: 'user_elena',
        name: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
        university: 'University of Salamanca',
        rating: 5.0,
        reviews: 51
      },
      wantsInReturn: ['UI/UX Design with Figma', 'Web Development'],
      description: 'Real-world dialogues, accent correction, idiom mastery, and rapid vocabulary building through interactive conversational drills.',
      sessionsOffered: '5 sessions (45 mins)',
      badge: 'Perfect Match (99%)',
      badgeColor: '#10b981',
      tags: ['Spanish', 'Language', 'Speaking', 'Grammar']
    },
    {
      id: 'skill_3',
      title: '3D Character Modeling & Rigging in Blender',
      category: 'Creative & 3D',
      level: 'Beginner to Intermediate',
      instructor: {
        id: 'user_marcus',
        name: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
        university: 'Vancouver Film School',
        rating: 4.92,
        reviews: 29
      },
      wantsInReturn: ['Tailwind CSS & Responsive Web', 'Modern JavaScript'],
      description: 'Step-by-step sculpting, retopology, UV unwrapping, bone rigging, and basic animation inside free Blender 4.0 software.',
      sessionsOffered: '3 sessions (1.5 hrs)',
      badge: 'High Match (94%)',
      badgeColor: '#10b981',
      tags: ['Blender', '3D Modeling', 'Sculpting', 'Game Art']
    },
    {
      id: 'skill_4',
      title: 'Public Speaking, TEDx Pitching & Leadership',
      category: 'Soft Skills',
      level: 'Intermediate to Advanced',
      instructor: {
        id: 'user_sarah',
        name: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
        university: 'Northwestern University',
        rating: 4.95,
        reviews: 47
      },
      wantsInReturn: ['Data Analysis with Pandas', 'Python'],
      description: 'Transform stage fright into charismatic authority. Learn pacing, vocal projection, body language, and structuring compelling stories.',
      sessionsOffered: '3 sessions (1 hr)',
      badge: 'Match (88%)',
      badgeColor: '#3b82f6',
      tags: ['Public Speaking', 'Storytelling', 'Leadership', 'Pitching']
    },
    {
      id: 'skill_5',
      title: 'Docker, Kubernetes & Production DevOps',
      category: 'Programming',
      level: 'Intermediate',
      instructor: {
        id: 'user_david',
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
        university: 'Georgia Tech',
        rating: 4.88,
        reviews: 24
      },
      wantsInReturn: ['Modern JavaScript (ES6+)', 'Node.js'],
      description: 'Build Dockerfiles, multi-container Docker Compose stacks, Helm charts, CI/CD automated deployments, and Kubernetes pods.',
      sessionsOffered: '4 sessions (1 hr)',
      badge: 'Skills Match (92%)',
      badgeColor: '#10b981',
      tags: ['DevOps', 'Docker', 'Kubernetes', 'Cloud']
    },
    {
      id: 'skill_6',
      title: 'Acoustic Guitar Mastery & Songwriting',
      category: 'Music & Audio',
      level: 'Beginner',
      instructor: {
        id: 'user_liam',
        name: 'Liam Chen',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80',
        university: 'Berklee College of Music',
        rating: 4.89,
        reviews: 21
      },
      wantsInReturn: ['React 19 & Next.js', 'Tailwind CSS'],
      description: 'Learn open chords, fingerpicking patterns, rhythm grooves, and play your favorite songs from day one with good posture and ear training.',
      sessionsOffered: '5 sessions (45 mins)',
      badge: 'Popular',
      badgeColor: '#8b5cf6',
      tags: ['Guitar', 'Music', 'Acoustic', 'Songwriting']
    }
  ],

  exchangeRequests: [
    {
      id: 'req_rec_1',
      type: 'received',
      fromUser: {
        id: 'user_priya',
        name: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
        rating: 4.98
      },
      skillOffered: 'Machine Learning & PyTorch',
      skillRequested: 'React 19 & Next.js',
      message: 'Hi Alex! I saw your React 19 profile. I can teach you deep learning from zero up to training real models on PyTorch in exchange for hands-on React app guidance.',
      sessions: '4 Sessions (1h each)',
      status: 'pending',
      date: '2 hours ago'
    },
    {
      id: 'req_rec_2',
      type: 'received',
      fromUser: {
        id: 'user_liam',
        name: 'Liam Chen',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80',
        rating: 4.89
      },
      skillOffered: 'Fingerstyle Acoustic Guitar',
      skillRequested: 'Tailwind CSS & Responsive Web',
      message: 'Hey! Would love to swap guitar lessons for helping me refactor my music portfolio using Tailwind CSS.',
      sessions: '3 Sessions',
      status: 'pending',
      date: 'Yesterday'
    },
    {
      id: 'req_sent_1',
      type: 'sent',
      toUser: {
        id: 'user_elena',
        name: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
        rating: 5.0
      },
      skillOffered: 'UI/UX Design with Figma',
      skillRequested: 'Conversational Spanish',
      message: 'Hola Elena! I would love to improve my spoken Spanish for tech conferences. In exchange, I can teach you end-to-end Figma UI/UX prototyping.',
      sessions: '5 Sessions (45m)',
      status: 'pending',
      date: '3 days ago'
    },
    {
      id: 'req_act_1',
      type: 'active',
      partnerUser: {
        id: 'user_marcus',
        name: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
        rating: 4.92,
        university: 'Vancouver Film School'
      },
      youTeach: 'Tailwind CSS & Responsive Web',
      theyTeach: '3D Blender Character Modeling',
      completedSessions: 3,
      totalSessions: 5,
      nextSessionDate: 'Tomorrow at 5:00 PM',
      status: 'in-progress',
      meetingRoomId: 'room_blender_tailwind'
    },
    {
      id: 'req_act_2',
      type: 'active',
      partnerUser: {
        id: 'user_david',
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
        rating: 4.88,
        university: 'Georgia Tech'
      },
      youTeach: 'Modern JavaScript (ES6+)',
      theyTeach: 'Docker & Kubernetes',
      completedSessions: 2,
      totalSessions: 4,
      nextSessionDate: 'Thursday at 6:30 PM',
      status: 'in-progress',
      meetingRoomId: 'room_docker_js'
    },
    {
      id: 'req_comp_1',
      type: 'completed',
      partnerUser: {
        id: 'user_sarah',
        name: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
        rating: 4.95
      },
      youTeach: 'Node.js & REST APIs',
      theyTeach: 'Public Speaking & Presentation',
      completedSessions: 4,
      totalSessions: 4,
      ratingReceived: 5,
      reviewText: 'Alex is an exceptional teacher! He explained backend concepts with crystal-clear metaphors.',
      date: 'Completed Oct 28'
    }
  ],

  upcomingSessions: [
    {
      id: 'sess_1',
      partner: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      topic: 'Blender 4.0 UV Unwrapping & Topology',
      type: 'You are Learning',
      time: 'Tomorrow, 5:00 PM - 6:30 PM',
      countdown: 'In 21 hours',
      roomId: 'room_blender_tailwind'
    },
    {
      id: 'sess_2',
      partner: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      topic: 'Async/Await, Closures & Event Loop in JS',
      type: 'You are Teaching',
      time: 'Thursday, 6:30 PM - 7:30 PM',
      countdown: 'In 2 days',
      roomId: 'room_docker_js'
    }
  ],

  chatThreads: [
    {
      id: 'chat_priya',
      userId: 'user_priya',
      userName: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
      skillSwapTopic: 'Machine Learning <-> React 19',
      unread: true,
      lastUpdated: '10:14 AM',
      messages: [
        { sender: 'them', text: 'Hi Alex! I reviewed your project portfolio on GitHub, really impressive work.', time: '10:02 AM' },
        { sender: 'them', text: 'I sent you an exchange request. Would you be free for an introductory 30-min sync this Friday?', time: '10:05 AM' },
        { sender: 'me', text: 'Hi Priya! Thanks so much. I have been wanting to dive deep into PyTorch for months. Friday 4 PM works great for me!', time: '10:12 AM' },
        { sender: 'them', text: 'Awesome! I will prepare our first module on PyTorch tensors and computation graphs.', time: '10:14 AM' }
      ]
    },
    {
      id: 'chat_marcus',
      userId: 'user_marcus',
      userName: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      skillSwapTopic: '3D Blender <-> Tailwind CSS',
      unread: false,
      lastUpdated: 'Yesterday',
      messages: [
        { sender: 'me', text: 'Hey Marcus, how did the Tailwind grid exercises go?', time: 'Yesterday 3:15 PM' },
        { sender: 'them', text: 'They were super helpful! Got my portfolio responsive across mobile and tablet now.', time: 'Yesterday 3:30 PM' },
        { sender: 'them', text: 'For tomorrow\'s 3D lesson, make sure you download Blender 4.1 and the character base mesh I uploaded!', time: 'Yesterday 3:32 PM' },
        { sender: 'me', text: 'Will do! See you in the virtual room tomorrow at 5:00 PM.', time: 'Yesterday 3:35 PM' }
      ]
    },
    {
      id: 'chat_david',
      userId: 'user_david',
      userName: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      skillSwapTopic: 'Docker & K8s <-> Modern JS',
      unread: false,
      lastUpdated: 'Nov 9',
      messages: [
        { sender: 'them', text: 'Hey Alex, ready for Thursday\'s Docker container deep-dive?', time: 'Nov 9 2:00 PM' },
        { sender: 'me', text: 'Yes, looking forward to it! I also prepared the slides on JS closures and promises.', time: 'Nov 9 2:15 PM' }
      ]
    }
  ],

  recentActivities: [
    { id: 'act_1', icon: 'fa-check-circle', color: '#10b981', title: 'Exchange Session Completed', desc: 'Finished 3D Sculpting Session #3 with Marcus Vance', time: 'Yesterday' },
    { id: 'act_2', icon: 'fa-coins', color: '#f59e0b', title: 'Earned 20 Karma Credits', desc: 'Received positive review from peer evaluation', time: '2 days ago' },
    { id: 'act_3', icon: 'fa-envelope-open-text', color: '#6366f1', title: 'New Swap Proposal', desc: 'Priya Sharma requested a React 19 <-> PyTorch exchange', time: '2 hours ago' },
    { id: 'act_4', icon: 'fa-star', color: '#eab308', title: '5-Star Review Received', desc: '"Alex gave thorough code reviews on my React components!"', time: 'Nov 6' }
  ],

  reviews: [
    {
      id: 'rev_1',
      author: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
      rating: 5,
      date: 'Oct 28',
      skillSwapped: 'Node.js & Express <-> Public Speaking',
      comment: 'Alex is one of the most patient and well-structured peer mentors I have worked with! He walked me through async Javascript with practical whiteboard analogies. 10/10 recommendation.'
    },
    {
      id: 'rev_2',
      author: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      rating: 5,
      date: 'Oct 15',
      skillSwapped: 'Modern JavaScript <-> Docker',
      comment: 'Super knowledgeable in React and frontend architecture. In return for Docker concepts, he completely revolutionized my understanding of React hooks and performance tuning.'
    },
    {
      id: 'rev_3',
      author: 'Maya Lin',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
      rating: 5,
      date: 'Sep 29',
      skillSwapped: 'UI/UX Design in Figma <-> Python Basics',
      comment: 'Very encouraging teacher. I went from knowing zero Figma to designing an entire mobile prototype in 3 sessions. Thanks Alex!'
    }
  ]
};

// Expose globally
window.INITIAL_DATA = INITIAL_DATA;
