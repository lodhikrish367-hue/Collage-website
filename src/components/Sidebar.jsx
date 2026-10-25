import React from 'react';
import {
  Home,
  Search,
  Compass,
  Clapperboard,
  MessageCircle,
  Heart,
  PlusSquare,
  User,
  Moon,
  Sun,
  Menu,
  GraduationCap
} from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';

export function Sidebar({
  currentView,
  setCurrentView,
  theme,
  toggleTheme,
  unreadMessagesCount = 2,
  unreadNotifsCount = 3,
  setIsCreateModalOpen,
  isSearchOpen,
  setIsSearchOpen,
  isNotifsOpen,
  setIsNotifsOpen,
}) {
  const handleNavClick = (viewName) => {
    if (viewName === 'search') {
      setIsSearchOpen(!isSearchOpen);
      setIsNotifsOpen(false);
      return;
    }
    if (viewName === 'notifications') {
      setIsNotifsOpen(!isNotifsOpen);
      setIsSearchOpen(false);
      return;
    }
    if (viewName === 'create') {
      setIsCreateModalOpen(true);
      return;
    }

    setIsSearchOpen(false);
    setIsNotifsOpen(false);
    setCurrentView(viewName);
  };

  return (
    <aside className="sidebar">
      <div>
        {/* Instagram + SD Bansal Collaboration Branding */}
        <div className="sidebar-logo-container" onClick={() => handleNavClick('home')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Instagram official SVG wordmark */}
            <svg
              className="instagram-logo-svg"
              viewBox="0 0 103 29"
              role="img"
              aria-label="Instagram"
            >
              <path d="M78.8 8.5c-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5-3.8-8.5-8.5-8.5zm0 14c-3 0-5.5-2.5-5.5-5.5s2.5-5.5 5.5-5.5 5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5zm19.7-14.7c-.7 0-1.3.6-1.3 1.3v.1c0 .7.6 1.3 1.3 1.3s1.3-.6 1.3-1.3c0-.8-.6-1.4-1.3-1.4zm-2.8 3.5h-5.6v14.4h5.6V11.3zm-32.9.2c-1.4-1.2-3.3-2-5.4-2-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5c2.1 0 4-.7 5.4-2v1.6h5.6V11.5h-5.6v1.5zm-5 11.4c-3 0-5.5-2.5-5.5-5.5s2.5-5.5 5.5-5.5 5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5zm-24.8-13h-5.6v14.4h5.6V13.4zm0-5.7h-5.6v3.4h5.6V7.7zm-14.3 6.9c-.8-.8-2-1.3-3.4-1.3-2.6 0-4.6 2-4.6 4.7 0 2.6 2 4.7 4.6 4.7 1.4 0 2.6-.5 3.4-1.3v1.1h3.3V11.5h-3.3v1.1zm-3.2 5.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-12.7-5.5h-3.2v-1.1h-3.3v8.5c0 3 2.1 5.3 5.3 5.3 1.8 0 3.3-.7 4.2-1.8v1.4h3.3v-14h-3.3v1.7zm-.2 8.6c-.7.7-1.7 1.1-2.7 1.1-1.7 0-2.8-1.1-2.8-2.9v-5.2h3.2v4.8c0 1.2.9 2.2 2.3 2.2zm-14.8-10.4h-3.4v14.4h3.4V11.5z"></path>
            </svg>
          </div>
          <div className="sidebar-collab-subtitle">
            <GraduationCap size={14} color="#f59e0b" />
            <span>× SD BANSAL INDORE</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          <div
            className={`nav-item ${currentView === 'home' && !isSearchOpen && !isNotifsOpen ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            <div className="nav-item-icon-wrapper">
              <Home size={24} strokeWidth={currentView === 'home' ? 2.5 : 2} />
            </div>
            <span className="nav-item-label">Home</span>
          </div>

          <div
            className={`nav-item ${isSearchOpen ? 'active' : ''}`}
            onClick={() => handleNavClick('search')}
          >
            <div className="nav-item-icon-wrapper">
              <Search size={24} strokeWidth={isSearchOpen ? 2.5 : 2} />
            </div>
            <span className="nav-item-label">Search</span>
          </div>

          <div
            className={`nav-item ${currentView === 'explore' ? 'active' : ''}`}
            onClick={() => handleNavClick('explore')}
          >
            <div className="nav-item-icon-wrapper">
              <Compass size={24} strokeWidth={currentView === 'explore' ? 2.5 : 2} />
            </div>
            <span className="nav-item-label">Explore</span>
          </div>

          <div
            className={`nav-item ${currentView === 'reels' ? 'active' : ''}`}
            onClick={() => handleNavClick('reels')}
          >
            <div className="nav-item-icon-wrapper">
              <Clapperboard size={24} strokeWidth={currentView === 'reels' ? 2.5 : 2} />
            </div>
            <span className="nav-item-label">Reels</span>
          </div>

          <div
            className={`nav-item ${currentView === 'messages' ? 'active' : ''}`}
            onClick={() => handleNavClick('messages')}
          >
            <div className="nav-item-icon-wrapper">
              <MessageCircle size={24} strokeWidth={currentView === 'messages' ? 2.5 : 2} />
              {unreadMessagesCount > 0 && <span className="badge-dot">{unreadMessagesCount}</span>}
            </div>
            <span className="nav-item-label">Messages</span>
          </div>

          <div
            className={`nav-item ${isNotifsOpen ? 'active' : ''}`}
            onClick={() => handleNavClick('notifications')}
          >
            <div className="nav-item-icon-wrapper">
              <Heart size={24} strokeWidth={isNotifsOpen ? 2.5 : 2} />
              {unreadNotifsCount > 0 && <span className="badge-dot">{unreadNotifsCount}</span>}
            </div>
            <span className="nav-item-label">Notifications</span>
          </div>

          <div
            className="nav-item"
            onClick={() => handleNavClick('create')}
          >
            <div className="nav-item-icon-wrapper">
              <PlusSquare size={24} strokeWidth={2} />
            </div>
            <span className="nav-item-label">Create</span>
          </div>

          <div
            className={`nav-item ${currentView === 'profile' ? 'active' : ''}`}
            onClick={() => handleNavClick('profile')}
          >
            <div className="nav-item-icon-wrapper">
              <img
                src={CURRENT_USER.avatar}
                alt={CURRENT_USER.username}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: currentView === 'profile' ? '2px solid var(--text-primary)' : 'none'
                }}
              />
            </div>
            <span className="nav-item-label">Profile</span>
          </div>
        </nav>
      </div>

      {/* Footer controls: Dark Mode toggle & Menu */}
      <div className="sidebar-footer">
        <div className="nav-item" onClick={toggleTheme}>
          <div className="nav-item-icon-wrapper">
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </div>
          <span className="nav-item-label">
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </span>
        </div>

        <a
          href="https://sdbc.ac.in"
          target="_blank"
          rel="noreferrer"
          className="nav-item"
          style={{ textDecoration: 'none' }}
        >
          <div className="nav-item-icon-wrapper">
            <Menu size={24} />
          </div>
          <span className="nav-item-label">Bansal Portal</span>
        </a>
      </div>
    </aside>
  );
}

