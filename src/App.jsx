import React, { useState, useEffect } from 'react';
import {
  INITIAL_POSTS,
  STORY_ITEMS,
  SUGGESTIONS_LIST,
  COLLEGE_INFO
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Feed } from './components/Feed';
import { RightSidebar } from './components/RightSidebar';
import { CollabHeader } from './components/CollabHeader';
import { ProfileView } from './components/ProfileView';
import { ReelsView } from './components/ReelsView';
import { ExploreView } from './components/ExploreView';
import { MessagesView } from './components/MessagesView';
import { StoryViewerModal } from './components/StoryViewerModal';
import { PostDetailModal } from './components/PostDetailModal';
import { CreatePostModal } from './components/CreatePostModal';
import { SearchDrawer } from './components/SearchDrawer';
import { NotificationsPanel } from './components/NotificationsPanel';

export function App() {
  const [theme, setTheme] = useState('dark');
  const [currentView, setCurrentView] = useState('home');
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [stories, setStories] = useState(STORY_ITEMS);
  const [suggestions, setSuggestions] = useState(SUGGESTIONS_LIST);

  // Modals & Panels
  const [activeStoryGroup, setActiveStoryGroup] = useState(null);
  const [activeDetailPost, setActiveDetailPost] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifsOpen, setIsNotifsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Like Toggle
  const handleLikeToggle = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLikedNow = !p.isLiked;
          return {
            ...p,
            isLiked: isLikedNow,
            likes: isLikedNow ? p.likes + 1 : p.likes - 1
          };
        }
        return p;
      })
    );

    // Also update detail post if open
    if (activeDetailPost && activeDetailPost.id === postId) {
      setActiveDetailPost((prev) => ({
        ...prev,
        isLiked: !prev.isLiked,
        likes: !prev.isLiked ? prev.likes + 1 : prev.likes - 1
      }));
    }
  };

  // Save Toggle
  const handleSaveToggle = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isSavedNow = !p.isSaved;
          if (isSavedNow) {
            showToast('Post saved to your collection');
          } else {
            showToast('Post removed from saved collection');
          }
          return { ...p, isSaved: isSavedNow };
        }
        return p;
      })
    );

    if (activeDetailPost && activeDetailPost.id === postId) {
      setActiveDetailPost((prev) => ({
        ...prev,
        isSaved: !prev.isSaved
      }));
    }
  };

  // Add Comment
  const handleAddComment = (postId, text) => {
    const newComment = {
      id: `c-${Date.now()}`,
      user: 'krish_bansalite',
      text: text,
      time: 'Just now'
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...(p.comments || []), newComment]
          };
        }
        return p;
      })
    );

    if (activeDetailPost && activeDetailPost.id === postId) {
      setActiveDetailPost((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), newComment]
      }));
    }

    showToast('Comment posted successfully');
  };

  // Create Post
  const handleCreatePost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
    setCurrentView('home');
    showToast('Post published to SD Bansal Campus Feed! 🎉');
  };

  // Follow Toggle in Suggestions
  const handleFollowToggle = (id) => {
    setSuggestions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFollowing: !item.isFollowing } : item
      )
    );
  };

  // Story selection
  const handleSelectStory = (storyGroup) => {
    setActiveStoryGroup(storyGroup);
    // Mark as seen
    setStories((prev) =>
      prev.map((s) => (s.id === storyGroup.id ? { ...s, hasUnseen: false } : s))
    );
  };

  // Next Story Group
  const handleNextStoryGroup = () => {
    const currentIndex = stories.findIndex((s) => s.id === activeStoryGroup?.id);
    if (currentIndex >= 0 && currentIndex < stories.length - 1) {
      handleSelectStory(stories[currentIndex + 1]);
    } else {
      setActiveStoryGroup(null);
    }
  };

  // Share post helper
  const handleSharePost = (post) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    showToast('Link copied to clipboard! Share with Bansalites.');
  };

  // Handle open profile
  const handleOpenProfile = (username) => {
    setCurrentView('profile');
    setIsSearchOpen(false);
    setIsNotifsOpen(false);
  };

  // Handle Explore Post click
  const handleSelectExplorePost = (item) => {
    const mockPost = {
      id: item.id,
      user: {
        username: COLLEGE_INFO.handle,
        name: COLLEGE_INFO.name,
        avatar: COLLEGE_INFO.avatar,
        verified: true,
        location: 'Sushila Devi Bansal College, Indore'
      },
      mediaType: item.type,
      mediaUrl: item.url,
      poster: item.thumb,
      likes: parseInt(item.likes.replace(/[^0-9]/g, '')) * 100 || 850,
      isLiked: false,
      isSaved: false,
      caption: `Campus moment at Sushila Devi Bansal College, Rau Indore! 🚀 #SDBansal #Timelapse2026 #IndoreCampus #RGPV`,
      timeAgo: 'EXPLORE HIGHLIGHT',
      comments: [
        { id: 'ec1', user: 'bansal_student', text: 'Loved this event at our campus! ❤️', time: '1d ago' }
      ]
    };
    setActiveDetailPost(mockPost);
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        theme={theme}
        toggleTheme={toggleTheme}
        unreadMessagesCount={2}
        unreadNotifsCount={3}
        setIsCreateModalOpen={setIsCreateModalOpen}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        isNotifsOpen={isNotifsOpen}
        setIsNotifsOpen={setIsNotifsOpen}
      />

      {/* Flyout Search Drawer */}
      <SearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={(item) => {
          if (item.type === 'user') {
            handleOpenProfile(item.username);
          } else {
            setCurrentView('explore');
          }
        }}
      />

      {/* Flyout Notifications Panel */}
      <NotificationsPanel
        isOpen={isNotifsOpen}
        onClose={() => setIsNotifsOpen(false)}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <div style={{ width: '100%' }}>
          {/* Top Collab Banner */}
          <CollabHeader onOpenProfile={() => setCurrentView('profile')} />

          {/* Views */}
          {currentView === 'home' && (
            <div className="feed-layout">
              <Feed
                stories={stories}
                posts={posts}
                onSelectStory={handleSelectStory}
                onLikeToggle={handleLikeToggle}
                onSaveToggle={handleSaveToggle}
                onAddComment={handleAddComment}
                onOpenDetail={(post) => setActiveDetailPost(post)}
                onOpenProfile={handleOpenProfile}
                onSharePost={handleSharePost}
              />

              <RightSidebar
                suggestions={suggestions}
                onFollowToggle={handleFollowToggle}
                onOpenProfile={handleOpenProfile}
                onSwitchUser={() => showToast('Switched to verified Bansal student profile')}
              />
            </div>
          )}

          {currentView === 'profile' && (
            <ProfileView
              posts={posts}
              onOpenDetail={(post) => setActiveDetailPost(post)}
              onOpenStory={(title) => {
                if (stories[0]) handleSelectStory(stories[0]);
              }}
              onOpenMessages={() => setCurrentView('messages')}
            />
          )}

          {currentView === 'reels' && (
            <ReelsView
              onSharePost={handleSharePost}
              onOpenMessages={() => setCurrentView('messages')}
            />
          )}

          {currentView === 'explore' && (
            <ExploreView
              onSelectExplorePost={handleSelectExplorePost}
            />
          )}

          {currentView === 'messages' && (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '0 20px' }}>
              <MessagesView />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {activeStoryGroup && (
        <StoryViewerModal
          storyGroup={activeStoryGroup}
          onClose={() => setActiveStoryGroup(null)}
          onNextGroup={handleNextStoryGroup}
        />
      )}

      {activeDetailPost && (
        <PostDetailModal
          post={activeDetailPost}
          onClose={() => setActiveDetailPost(null)}
          onLikeToggle={handleLikeToggle}
          onSaveToggle={handleSaveToggle}
          onAddComment={handleAddComment}
          onOpenProfile={handleOpenProfile}
          onSharePost={handleSharePost}
        />
      )}

      {isCreateModalOpen && (
        <CreatePostModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreatePost={handleCreatePost}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notice">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;
