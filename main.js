// Instagram Web x SD Bansal College, Indore Collaboration App (Standalone React)
const { useState, useEffect, useRef } = React;

const COLLEGE_INFO = {
  name: "Sushila Devi Bansal College, Indore",
  institutions: [
    "SDBCT - Sushila Devi Bansal College of Technology",
    "SDBCE - Sushila Devi Bansal College of Engineering"
  ],
  group: "Bansal Group of Institutes (BGI)",
  established: 2005,
  location: "Umaria, A.B. Road, Near Rau, Indore, Madhya Pradesh - 453331",
  campusSize: "25+ Acre Green Campus on A.B. Road Corridor",
  approvals: "AICTE New Delhi & Govt. of Madhya Pradesh",
  affiliations: [
    "RGPV (Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal) for Engineering & Tech",
    "DAVV (Devi Ahilya Vishwavidyalaya, Indore) for Management (MBA)"
  ],
  website: "https://sdbc.ac.in",
  handle: "sdbansal_indore",
  verified: true,
  followersCount: "18.4K",
  followingCount: "142",
  postsCount: 348,
  avatar: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80",
  bio: `🏛️ Sushila Devi Bansal College, Indore (SDBCT & SDBCE)
🎓 AICTE Approved | Affiliated to RGPV Bhopal & DAVV Indore
📍 Umaria, A.B. Road, Rau, Indore (MP)
🚀 B.Tech • CSE | AI & ML | Data Science | Cyber | IT | ECE | ME | CE • MBA
🏆 Home of Central India's Premier Fest: #Timelapse
🔗 sdbc.ac.in`,
};

const CURRENT_USER = {
  username: "krish_bansalite",
  name: "Krish Sharma",
  role: "Student • B.Tech CSE (2023-27)",
  college: "SDBCT Indore",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
};

const STORY_ITEMS = [
  {
    id: "story-sdbansal",
    username: "sdbansal_indore",
    avatar: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=300&q=80",
    verified: true,
    hasUnseen: true,
    stories: [
      {
        id: "s1-1",
        type: "video",
        mediaUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        caption: "🌿 Good Morning Bansalites! Scenic aerial view of our Umaria Rau Campus today.",
        time: "2h ago",
      },
      {
        id: "s1-2",
        type: "image",
        mediaUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1080&q=80",
        caption: "Central Digital Library: High-speed e-resource zone open till 8 PM today for upcoming RGPV mid-sems! 📚",
        time: "4h ago",
      }
    ]
  },
  {
    id: "story-timelapse",
    username: "timelapse_bgi",
    avatar: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80",
    verified: true,
    hasUnseen: true,
    stories: [
      {
        id: "s2-1",
        type: "image",
        mediaUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1080&q=80",
        caption: "🔥 TIMELAPSE 2026 DATES ANNOUNCED! Central India's biggest tech-cultural festival is coming back bigger than ever! Stay tuned for celebrity headliner reveals.",
        time: "3h ago",
      }
    ]
  },
  {
    id: "story-techcrafters",
    username: "techcrafters_sdbc",
    avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=300&q=80",
    verified: false,
    hasUnseen: true,
    stories: [
      {
        id: "s3-1",
        type: "image",
        mediaUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1080&q=80",
        caption: "⚡ Robotics Lab Workshop: Autonomous bot prototyping in session. Mentored by ECE & CSE faculty.",
        time: "5h ago",
      }
    ]
  },
  {
    id: "story-placements",
    username: "bansal_placements",
    avatar: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=300&q=80",
    verified: true,
    hasUnseen: true,
    stories: [
      {
        id: "s4-1",
        type: "image",
        mediaUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1080&q=80",
        caption: "💼 Day 1 Placement Drive: Over 80+ offers rolled out by TCS & Cognizant today! Heartiest congratulations Bansalites!",
        time: "6h ago",
      }
    ]
  },
  {
    id: "story-sports",
    username: "bgi_sports",
    avatar: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=300&q=80",
    verified: false,
    hasUnseen: true,
    stories: [
      {
        id: "s5-1",
        type: "image",
        mediaUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1080&q=80",
        caption: "🏆 Spandan 2026 Basketball Tournament: Final match begins today at 4:30 PM on the outdoor campus court!",
        time: "8h ago",
      }
    ]
  }
];

const HIGHLIGHTS_DATA = [
  { id: "hl-1", title: "Campus 🏛️", cover: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=300&q=80" },
  { id: "hl-2", title: "Timelapse 🎭", cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=300&q=80" },
  { id: "hl-3", title: "TechClubs 💻", cover: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=300&q=80" },
  { id: "hl-4", title: "Placements 💼", cover: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=300&q=80" },
  { id: "hl-5", title: "Spandan 🏆", cover: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=300&q=80" },
  { id: "hl-6", title: "Research 🔬", cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80" }
];

const INITIAL_POSTS = [
  {
    id: "post-1",
    user: {
      username: "sdbansal_indore",
      name: "Sushila Devi Bansal College, Indore",
      avatar: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=300&q=80",
      verified: true,
      location: "Sushila Devi Bansal College, Indore (Umaria, A.B. Road)",
    },
    mediaType: "video",
    mediaUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    likes: 1842,
    isLiked: false,
    isSaved: false,
    caption: `🔥 THE WAIT IS OVER! Central India’s biggest tech-cultural festival BGI TIMELAPSE 2026 is officially here at Sushila Devi Bansal College, Indore! 🌟

Get ready for 3 days of high-octane energy:
✨ Star Celebrity Night & Live Concert
⚡ Robo-Wars & 36-Hr National Hackathon
💃 Inter-College Dance Battles & Fashion Fiesta
🎮 LAN Gaming Championship (BGMI, Valorant, FIFA)

📍 Sushila Devi Bansal College of Technology & Engineering, Umaria, A.B. Road, Rau, Indore.
Registrations now open at campus helpdesk & online portal! Let's make memories, Bansalites! 🎉

#SDBansal #Timelapse2026 #IndoreCollegeFest #BGIIndore #RGPV #DAVV #EngineeringLife #IndoreEvents`,
    timeAgo: "2 HOURS AGO",
    comments: [
      { id: "c1", user: "aarav_techie", text: "Can't wait for the EDM Night! Best fest in Indore every single year 🔥🙌", time: "1h ago" },
      { id: "c2", user: "priya_cse26", text: "Hackathon registrations already filled from our branch! Super excited 💻🚀", time: "45m ago" },
      { id: "c3", user: "timelapse_bgi", text: "Star artist lineup drops this Friday! Keep notifications ON! 🎤🎸", time: "30m ago" }
    ]
  },
  {
    id: "post-2",
    user: {
      username: "sdbansal_indore",
      name: "Sushila Devi Bansal College, Indore",
      avatar: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=300&q=80",
      verified: true,
      location: "SDBCT Auditorium, Indore",
    },
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    likes: 1256,
    isLiked: true,
    isSaved: true,
    caption: `Proud moment for SD Bansal College of Technology (SDBCT), Indore! 🎓🤖

Successfully inaugurated the IEEE International Conference on Machine Intelligence and Cyber-Physical Systems (ICMICPS). We are honored to host distinguished scientists, researchers, and academicians from top IITs, NITs, and global universities at our Umaria Rau Campus.

Over 150+ research papers presented on:
🔹 Generative AI & Deep Learning in Healthcare
🔹 Edge Computing & Smart Grids
🔹 Next-Gen Cyber Security & Quantum Defense

#IEEE #ICMICPS #ResearchAtSDBCT #SDBansal #ArtificialIntelligence #RGPV #IndoreEducation`,
    timeAgo: "1 DAY AGO",
    comments: [
      { id: "c5", user: "dr_sharma_cse", text: "Outstanding presentations by our final year AI-ML batch. Congratulations to all organizing committee members!", time: "18h ago" }
    ]
  },
  {
    id: "post-3",
    user: {
      username: "techcrafters_sdbc",
      name: "Tech-Crafters IoT & Coding Club",
      avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=300&q=80",
      verified: false,
      location: "Advanced Computing Lab, SDBCE Indore",
    },
    mediaType: "video",
    mediaUrl: "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/face-demographics-walking.mp4",
    poster: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    likes: 948,
    isLiked: false,
    isSaved: false,
    caption: `⚡ 36 HOURS, 60 TEAMS, INFINITE COFFEE! ☕💻

Highlights from the SDBCT Tech-Crafters HackSprint in our Central Computing Centre! Students built working prototypes for Smart Agriculture IoT nodes, Campus Navigation Apps, and AI-powered grievance portals for Indore Smart City.

#TechCrafters #SDBCT #HackSprint #CodingIndore #IoTInnovation #BansalTechies`,
    timeAgo: "2 DAYS AGO",
    comments: [
      { id: "c7", user: "dev_ankit", text: "Zero sleep, 4 cups of Nescafe from canteen, and our app worked on demo! Best weekend ever ❤️", time: "1d ago" }
    ]
  },
  {
    id: "post-4",
    user: {
      username: "bansal_placements",
      name: "Training & Placement Cell, SDBCT",
      avatar: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=300&q=80",
      verified: true,
      location: "Training & Placement Cell, SDBCT Rau",
    },
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    likes: 3120,
    isLiked: true,
    isSaved: true,
    caption: `🎉 RECORD-BREAKING PLACEMENT SEASON 2026 AT SD BANSAL! 💼🚀

Heartiest congratulations to our students of Sushila Devi Bansal College of Technology & Engineering! Over 480+ placement offers with leading multinational tech giants including TCS Digital, Infosys, Capgemini, Cognizant, Wipro, Impetus, and Yash Technologies Indore!

Highest Package: 18.5 LPA in Advanced Software Engineering 🎓✨

#Placements2026 #SDBCTPlacements #BansalGroup #TCS #Infosys #Capgemini #SuccessStories #IndorePlacements`,
    timeAgo: "4 DAYS AGO",
    comments: [
      { id: "c11", user: "rahul_tcs", text: "Got selected for TCS Digital through SDBCT campus drive! Heartfelt thanks to our T&P faculty mentors! 🙏", time: "3d ago" }
    ]
  }
];

const SUGGESTIONS_LIST = [
  { id: "sug-1", username: "bansal_placements", name: "T&P Cell SDBCT Indore", avatar: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=200&q=80", relation: "Official Placement Updates", isFollowing: false },
  { id: "sug-2", username: "timelapse_bgi", name: "Timelapse Fest Official", avatar: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=80", relation: "Annual Mega Fest Page", isFollowing: true },
  { id: "sug-3", username: "techcrafters_sdbc", name: "Tech-Crafters Robotics", avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=200&q=80", relation: "Student Robotics & IoT", isFollowing: false },
  { id: "sug-4", username: "rgpv_updates", name: "RGPV University Bhopal", avatar: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=200&q=80", relation: "Affiliated Technical University", isFollowing: false }
];

const REELS_DATA = [
  {
    id: "reel-1",
    user: { username: "timelapse_bgi", avatar: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=80", verified: true },
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    caption: "The crowd vibe at BGI Timelapse Star Night in Indore! 🌟 Can't wait for the 2026 edition! #Timelapse2026 #SDBansal #ConcertVibes",
    audioTrack: "Original Sound - BGI Timelapse Stage 2026 🎵",
    likes: "8.4K",
    comments: "420",
    shares: "1.2K"
  },
  {
    id: "reel-2",
    user: { username: "techcrafters_sdbc", avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=200&q=80", verified: false },
    videoUrl: "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/face-demographics-walking.mp4",
    caption: "Autonomous quadcopter surveillance test flight by CSE & ECE final year students at SDBCT Indore! 🚁⚡ #DroneLab #SDBansal #Robotics",
    audioTrack: "Cyberpunk Tech Beat - TechCrafters SDBCT 🎵",
    likes: "5.1K",
    comments: "189",
    shares: "730"
  }
];

// Main Application Component
function App() {
  const [theme, setTheme] = useState('dark');
  const [currentView, setCurrentView] = useState('home');
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [stories, setStories] = useState(STORY_ITEMS);
  const [suggestions, setSuggestions] = useState(SUGGESTIONS_LIST);
  const [activeStoryGroup, setActiveStoryGroup] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLikedNow = !p.isLiked;
          if (isLikedNow && window.confetti) {
            window.confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
          }
          return {
            ...p,
            isLiked: isLikedNow,
            likes: isLikedNow ? p.likes + 1 : p.likes - 1
          };
        }
        return p;
      })
    );
  };

  const handleSave = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          showToast(!p.isSaved ? "Saved to Bansal collection!" : "Removed from saved.");
          return { ...p, isSaved: !p.isSaved };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId, text) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...p.comments, { id: `c-${Date.now()}`, user: CURRENT_USER.username, text, time: "Just now" }]
          };
        }
        return p;
      })
    );
    showToast("Comment posted!");
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <div className="sidebar-logo-container" onClick={() => setCurrentView('home')}>
            <svg className="instagram-logo-svg" viewBox="0 0 103 29" role="img">
              <path d="M78.8 8.5c-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5-3.8-8.5-8.5-8.5zm0 14c-3 0-5.5-2.5-5.5-5.5s2.5-5.5 5.5-5.5 5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5zm19.7-14.7c-.7 0-1.3.6-1.3 1.3v.1c0 .7.6 1.3 1.3 1.3s1.3-.6 1.3-1.3c0-.8-.6-1.4-1.3-1.4zm-2.8 3.5h-5.6v14.4h5.6V11.3zm-32.9.2c-1.4-1.2-3.3-2-5.4-2-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5c2.1 0 4-.7 5.4-2v1.6h5.6V11.5h-5.6v1.5zm-5 11.4c-3 0-5.5-2.5-5.5-5.5s2.5-5.5 5.5-5.5 5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5zm-24.8-13h-5.6v14.4h5.6V13.4zm0-5.7h-5.6v3.4h5.6V7.7zm-14.3 6.9c-.8-.8-2-1.3-3.4-1.3-2.6 0-4.6 2-4.6 4.7 0 2.6 2 4.7 4.6 4.7 1.4 0 2.6-.5 3.4-1.3v1.1h3.3V11.5h-3.3v1.1zm-3.2 5.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-12.7-5.5h-3.2v-1.1h-3.3v8.5c0 3 2.1 5.3 5.3 5.3 1.8 0 3.3-.7 4.2-1.8v1.4h3.3v-14h-3.3v1.7zm-.2 8.6c-.7.7-1.7 1.1-2.7 1.1-1.7 0-2.8-1.1-2.8-2.9v-5.2h3.2v4.8c0 1.2.9 2.2 2.3 2.2zm-14.8-10.4h-3.4v14.4h3.4V11.5z"></path>
            </svg>
            <div className="sidebar-collab-subtitle">
              🎓 × SD BANSAL INDORE
            </div>
          </div>

          <nav className="sidebar-nav">
            <div className={`nav-item ${currentView === 'home' ? 'active' : ''}`} onClick={() => setCurrentView('home')}>
              <span>🏠</span>
              <span className="nav-item-label">Home</span>
            </div>
            <div className={`nav-item ${currentView === 'explore' ? 'active' : ''}`} onClick={() => setCurrentView('explore')}>
              <span>🧭</span>
              <span className="nav-item-label">Explore</span>
            </div>
            <div className={`nav-item ${currentView === 'reels' ? 'active' : ''}`} onClick={() => setCurrentView('reels')}>
              <span>🎬</span>
              <span className="nav-item-label">Reels</span>
            </div>
            <div className={`nav-item ${currentView === 'profile' ? 'active' : ''}`} onClick={() => setCurrentView('profile')}>
              <img src={CURRENT_USER.avatar} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
              <span className="nav-item-label">Profile</span>
            </div>
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="nav-item" onClick={toggleTheme}>
            <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
            <span className="nav-item-label">{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
          </div>
          <a href="https://sdbc.ac.in" target="_blank" className="nav-item" style={{ textDecoration: 'none' }}>
            <span>🏛️</span>
            <span className="nav-item-label">sdbc.ac.in</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-wrapper">
        <div style={{ width: '100%' }}>
          {/* Collab Header Banner */}
          <div className="collab-banner">
            <div className="collab-tag">
              <span>🏛️ <strong>Sushila Devi Bansal College, Indore (SDBCT & SDBCE)</strong> × Instagram Web 2026</span>
              <span className="collab-pill">RGPV & DAVV</span>
            </div>
            <button
              onClick={() => setCurrentView('profile')}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: '600' }}
            >
              ✨ View College Profile
            </button>
          </div>

          {currentView === 'home' && (
            <div className="feed-layout">
              <div className="feed-column">
                {/* Stories Bar */}
                <div className="stories-container">
                  {stories.map((s) => (
                    <div key={s.id} className="story-item" onClick={() => setActiveStoryGroup(s)}>
                      <div className="story-ring">
                        <img src={s.avatar} className="story-avatar-img" />
                      </div>
                      <span className="story-username">{s.username}</span>
                    </div>
                  ))}
                </div>

                {/* Posts Feed */}
                {posts.map((post) => (
                  <article key={post.id} className="post-card">
                    <div className="post-header">
                      <div className="post-user-info">
                        <img src={post.user.avatar} className="post-avatar" onClick={() => setCurrentView('profile')} />
                        <div>
                          <div className="post-username-row" onClick={() => setCurrentView('profile')}>
                            <span>{post.user.username}</span>
                            {post.user.verified && <span style={{ color: '#0095f6' }}>✓</span>}
                          </div>
                          <span className="post-location">{post.user.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="post-media-container" onDoubleClick={() => handleLike(post.id)}>
                      {post.mediaType === 'video' ? (
                        <video src={post.mediaUrl} poster={post.poster} autoPlay muted loop playsInline className="post-media-video" />
                      ) : (
                        <img src={post.mediaUrl} className="post-media-img" />
                      )}
                    </div>

                    <div className="post-actions">
                      <div className="post-actions-left">
                        <button className="action-btn" onClick={() => handleLike(post.id)}>
                          <span style={{ fontSize: '20px', color: post.isLiked ? '#ff3040' : 'inherit' }}>
                            {post.isLiked ? '❤️' : '🤍'}
                          </span>
                        </button>
                        <button className="action-btn" onClick={() => showToast('Share link copied!')}>
                          <span style={{ fontSize: '20px' }}>↗️</span>
                        </button>
                      </div>
                      <button className="action-btn" onClick={() => handleSave(post.id)}>
                        <span style={{ fontSize: '20px' }}>{post.isSaved ? '🔖' : '🏷️'}</span>
                      </button>
                    </div>

                    <div className="post-likes">{post.likes.toLocaleString()} likes</div>
                    <div className="post-caption">
                      <strong>{post.user.username}</strong> {post.caption}
                    </div>

                    {post.comments.map((c) => (
                      <div key={c.id} style={{ padding: '2px 14px', fontSize: '13px' }}>
                        <strong>{c.user}</strong> {c.text}
                      </div>
                    ))}

                    <div className="post-timestamp">{post.timeAgo}</div>
                  </article>
                ))}
              </div>

              {/* Right Suggestions */}
              <aside className="suggestions-sidebar">
                <div className="current-user-card">
                  <div className="current-user-left">
                    <img src={CURRENT_USER.avatar} className="current-user-avatar" />
                    <div>
                      <div className="current-username">{CURRENT_USER.username}</div>
                      <div className="current-user-subtitle">{CURRENT_USER.role}</div>
                      <div style={{ fontSize: '11px', color: 'var(--college-gold)' }}>📍 {CURRENT_USER.college}</div>
                    </div>
                  </div>
                </div>

                <div className="suggestions-header">
                  <span>Suggested for you</span>
                </div>

                {suggestions.map((s) => (
                  <div key={s.id} className="suggestion-item">
                    <div className="suggestion-left">
                      <img src={s.avatar} className="suggestion-avatar" />
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '13px' }}>{s.username}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{s.relation}</div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="suggestions-footer">
                  © 2026 INSTAGRAM FROM META × SUSHILA DEVI BANSAL COLLEGE, INDORE
                </div>
              </aside>
            </div>
          )}

          {currentView === 'profile' && (
            <div className="profile-container">
              <div className="profile-header">
                <div className="profile-avatar-container">
                  <img src={COLLEGE_INFO.avatar} className="profile-avatar" />
                </div>
                <div className="profile-details">
                  <div className="profile-title-row">
                    <h2 className="profile-handle">{COLLEGE_INFO.handle}</h2>
                    <span style={{ color: '#0095f6', fontWeight: 'bold' }}>✓</span>
                  </div>
                  <div className="profile-stats-row">
                    <div><strong>348</strong> posts</div>
                    <div><strong>18.4K</strong> followers</div>
                    <div><strong>142</strong> following</div>
                  </div>
                  <div className="profile-bio">
                    <strong>{COLLEGE_INFO.name}</strong>
                    <p style={{ marginTop: '4px' }}>{COLLEGE_INFO.bio}</p>
                  </div>
                </div>
              </div>

              <div className="highlights-tray">
                {HIGHLIGHTS_DATA.map((h) => (
                  <div key={h.id} className="highlight-circle">
                    <div className="highlight-ring">
                      <img src={h.cover} className="highlight-cover" />
                    </div>
                    <span className="highlight-title">{h.title}</span>
                  </div>
                ))}
              </div>

              <div className="profile-posts-grid">
                {posts.map((p) => (
                  <div key={p.id} className="grid-item">
                    <img src={p.mediaType === 'video' ? p.poster : p.mediaUrl} className="grid-media" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'reels' && (
            <div className="reels-container">
              {REELS_DATA.map((r) => (
                <div key={r.id} className="reel-card">
                  <div className="reel-video-wrapper">
                    <video src={r.videoUrl} autoPlay muted loop playsInline className="reel-video" />
                    <div className="reel-overlay-info">
                      <div className="reel-user-row">
                        <img src={r.user.avatar} className="reel-avatar" />
                        <span className="reel-username">{r.user.username}</span>
                      </div>
                      <p className="reel-caption">{r.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentView === 'explore' && (
            <div className="explore-container">
              <div className="profile-posts-grid">
                {posts.map((p) => (
                  <div key={p.id} className="grid-item">
                    <img src={p.mediaType === 'video' ? p.poster : p.mediaUrl} className="grid-media" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Story Viewer Modal */}
      {activeStoryGroup && (
        <div className="story-viewer-backdrop" onClick={() => setActiveStoryGroup(null)}>
          <div className="story-viewer-container" onClick={(e) => e.stopPropagation()}>
            <div className="story-top-info">
              <span>{activeStoryGroup.username}</span>
              <button onClick={() => setActiveStoryGroup(null)} style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
            </div>
            {activeStoryGroup.stories[0].type === 'video' ? (
              <video src={activeStoryGroup.stories[0].mediaUrl} autoPlay muted playsInline loop className="story-media-view" />
            ) : (
              <img src={activeStoryGroup.stories[0].mediaUrl} className="story-media-view" />
            )}
            <div style={{ position: 'absolute', bottom: 20, left: 16, right: 16, color: '#fff', background: 'rgba(0,0,0,0.6)', padding: '10px', borderRadius: '8px' }}>
              {activeStoryGroup.stories[0].caption}
            </div>
          </div>
        </div>
      )}

      {toastMessage && <div className="toast-notice">{toastMessage}</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

