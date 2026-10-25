# 📸 Instagram × Sushila Devi Bansal College, Indore (SDBCT & SDBCE)
### *Web Edition Institutional Collaboration Clone*

An authentic, pixel-perfect clone of the **Instagram Web** interface customized as an official institutional collaboration with **Sushila Devi Bansal College, Indore** (Bansal Group of Institutes).

---

## 🏛️ SD Bansal College, Indore — Institutional Sync
* **Institutions**:
  * **SDBCT** – Sushila Devi Bansal College of Technology, Indore
  * **SDBCE** – Sushila Devi Bansal College of Engineering, Indore
* **Group**: Bansal Group of Institutes (BGI), established in 2005.
* **Campus Location**: Umaria, A.B. Road, Near Rau, Indore, Madhya Pradesh - 453331 (25+ Acre Green Campus).
* **Affiliations & Approvals**: Approved by AICTE, New Delhi; Affiliated to **RGPV (Rajiv Gandhi Proudyogiki Vishwavidyalaya), Bhopal** for Engineering & Technology and **DAVV (Devi Ahilya Vishwavidyalaya), Indore** for MBA programs.
* **Flagship Campus Fest**: **BGI Timelapse** (Central India’s premier annual tech-cultural festival featuring celebrity star nights, hackathons, robo-wars, and EDM concerts).
* **Sports Meet**: **Spandan** (Annual inter-departmental sports championship).
* **Clubs & Research**: Tech-Crafters (Robotics & IoT), SDBCT Coding Club, IEEE Student Branch & ICMICPS International Conference, Training & Placement Cell (T&P).

---

## ✨ Features & Architecture

### 1. 🖥️ Authentic Instagram Web UX & Visuals
* **Left Navigation Dock**:
  * Official Instagram wordmark with `× SD BANSAL INDORE` gold collaboration badge.
  * Navigation items: **Home**, **Search** (flyout drawer), **Explore** (masonry grid), **Reels** (vertical player), **Messages** (direct chat), **Notifications** (panel), **Create** (post modal), and **Profile**.
  * **Dark Mode & Light Mode**: Instant toggle between Instagram true black (`#000000`) and light (`#ffffff`).
  * Direct portal shortcut to `sdbc.ac.in`.

### 2. 🎥 Working Demo Video & Media Experience
* **Working HTML5 Video Posts**: Auto-looping video player with:
  * Click to play/pause with animated pulsing center icon.
  * Mute/Unmute audio controls with volume indicator.
  * Video poster thumbnails and responsive aspect ratios.
* **Double-Click to Heart**: Double-clicking any post image or video triggers an authentic Instagram heart burst animation with festive confetti!
* **Interactive Post Actions**: Real-time like counter increment/decrement, save/bookmark to user profile, link copy to clipboard, and instant comment posting.

### 3. ⭕ Stories Tray & Fullscreen Story Viewer
* Instagram gradient ring avatars (`@sdbansal_indore`, `@timelapse_bgi`, `@techcrafters_sdbc`, `@bansal_placements`, `@bgi_sports`, `@rgpv_updates`).
* **Fullscreen Story Viewer Modal**:
  * Animated segmented progress bars (5 seconds auto-advance).
  * Pause/Resume on hold (mouse down / touch).
  * Previous / Next slide navigation.
  * Reply input and floating heart reaction particles.

### 4. 🎬 Reels Vertical Fullscreen Player
* 9:16 aspect ratio vertical video player for campus fest moments and drone flights.
* Up/Down navigation buttons to jump between reels.
* Audio track marquee ticker (*"Original Sound - BGI Timelapse Stage 2026 🎵"*).
* Like, comment, share, and sound controls.

### 5. 💬 Direct Messages (DM) Simulator
* Chat thread with **SD Bansal College Admission Desk**, **Timelapse Core Team**, and **Tech-Crafters Club**.
* Automated simulated campus replies for fest passes, admission criteria, and bus routes across Indore (Vijay Nagar, Palasia, Rajwada, Rau).

### 6. 👤 Official College Profile Page (`@sdbansal_indore`)
* Verified blue badge, follower counts (`18.4K`), and accredited bio.
* Circular Story Highlights: `🏛️ Campus`, `🎭 Timelapse`, `💻 TechClubs`, `💼 Placements`, `🏆 Sports`, `🔬 Research`.
* Filterable tabs: **POSTS**, **REELS**, **SAVED** (shows bookmarked posts), and **TAGGED**.

### 7. ➕ Create New Post Modal
* Select from curated SD Bansal campus demo presets (Fest concert video, Robotics lab, Central digital library, Hackathon coding) or upload custom local files or URLs.
* Tag location to `Sushila Devi Bansal College, Indore` and share live to the feed.

---

## 🚀 How to Run the Project

### Option A: Modern Vite Dev Server (Recommended)
In this workspace directory, run:
```powershell
npm run dev
```
Open the local URL displayed in the terminal (usually `http://localhost:5173`) in your web browser.

### Option B: Direct Browser Preview (Zero Setup)
Simply double-click or open `main.html` directly in any web browser (Google Chrome, Microsoft Edge, Firefox, Brave). It includes the complete standalone React application with CDN dependencies.

### Option C: Production Build & Preview
```powershell
npm run build
npm run preview
```

---

## 📁 File Structure
```
minor project/
├── index.html                   # HTML template for Vite React app
├── vite.config.js               # Vite build configuration
├── package.json                 # Project dependencies (React 19, Lucide, Confetti)
├── main.html                    # Standalone direct-browser preview HTML
├── main.js                      # Standalone direct-browser React script
├── main.css                     # Instagram Web CSS styles & dark/light theme
├── src/
│   ├── main.jsx                 # Vite React root mount
│   ├── App.jsx                  # Main application state & view router
│   ├── index.css                # Instagram variables, keyframe animations, responsive grid
│   ├── data/
│   │   └── mockData.js          # SDBCT/SDBCE details, posts, stories, reels, chats
│   └── components/
│       ├── Sidebar.jsx          # Left Instagram navigation dock
│       ├── CollabHeader.jsx     # Institutional collaboration banner
│       ├── StoriesBar.jsx       # Top stories tray with gradient rings
│       ├── StoryViewerModal.jsx # Full-screen interactive story player
│       ├── Feed.jsx             # Main feed container
│       ├── PostCard.jsx         # Post card with video player & like animations
│       ├── PostDetailModal.jsx  # Desktop expanded post & comment modal
│       ├── RightSidebar.jsx     # User switcher & suggested Bansal accounts
│       ├── ReelsView.jsx        # Vertical TikTok/Reels feed
│       ├── ExploreView.jsx      # 3-column explore grid
│       ├── MessagesView.jsx     # Direct chat messenger
│       ├── SearchDrawer.jsx     # Slide-out campus search drawer
│       ├── NotificationsPanel.jsx # Real-time notifications flyout
│       ├── CreatePostModal.jsx  # Post publishing modal
│       └── ProfileView.jsx      # Official SD Bansal College profile
└── dist/                        # Production optimized build output
```

---
*Created as a Minor Project Collaboration for Sushila Devi Bansal College, Indore.*
