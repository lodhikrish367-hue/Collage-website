import React, { useState } from 'react';
import {
  COLLEGE_INFO,
  HIGHLIGHTS_DATA,
  REELS_DATA
} from '../data/mockData';
import {
  CheckCircle2,
  Grid,
  Bookmark,
  Clapperboard,
  Tag,
  Heart,
  MessageCircle,
  Play
} from 'lucide-react';

export function ProfileView({
  posts,
  onOpenDetail,
  onOpenStory,
  onOpenMessages
}) {
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(18420);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowerCount((prev) => prev - 1);
    } else {
      setIsFollowing(true);
      setFollowerCount((prev) => prev + 1);
    }
  };

  // Filter posts based on tab
  const displayedPosts = activeTab === 'saved'
    ? posts.filter((p) => p.isSaved)
    : activeTab === 'reels'
    ? posts.filter((p) => p.mediaType === 'video')
    : posts;

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar-container">
          <img
            src={COLLEGE_INFO.avatar}
            alt={COLLEGE_INFO.name}
            className="profile-avatar"
          />
        </div>

        <div className="profile-details">
          <div className="profile-title-row">
            <h2 className="profile-handle">{COLLEGE_INFO.handle}</h2>
            <CheckCircle2 size={20} fill="#0095f6" color="#fff" />

            <div style={{ display: 'flex', gap: '8px', marginLeft: '12px' }}>
              <button
                className={`profile-action-btn ${isFollowing ? '' : 'primary'}`}
                onClick={handleFollowToggle}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>

              <button
                className="profile-action-btn"
                onClick={onOpenMessages}
              >
                Message
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="profile-stats-row">
            <div className="stat-item">
              <span className="stat-num">{posts.length + 342}</span> posts
            </div>
            <div className="stat-item">
              <span className="stat-num">{followerCount.toLocaleString()}</span> followers
            </div>
            <div className="stat-item">
              <span className="stat-num">{COLLEGE_INFO.followingCount}</span> following
            </div>
          </div>

          {/* Bio */}
          <div className="profile-bio">
            <strong>{COLLEGE_INFO.name}</strong>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
              {COLLEGE_INFO.institutions.join(' • ')}
            </p>
            <p style={{ marginTop: '6px' }}>{COLLEGE_INFO.bio}</p>
          </div>
        </div>
      </div>

      {/* Story Highlights */}
      <div className="highlights-tray">
        {HIGHLIGHTS_DATA.map((hl) => (
          <div
            key={hl.id}
            className="highlight-circle"
            onClick={() => onOpenStory(hl.title)}
          >
            <div className="highlight-ring">
              <img
                src={hl.cover}
                alt={hl.title}
                className="highlight-cover"
              />
            </div>
            <span className="highlight-title">{hl.title}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <div
          className={`profile-tab ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          <Grid size={13} />
          <span>POSTS</span>
        </div>

        <div
          className={`profile-tab ${activeTab === 'reels' ? 'active' : ''}`}
          onClick={() => setActiveTab('reels')}
        >
          <Clapperboard size={13} />
          <span>REELS</span>
        </div>

        <div
          className={`profile-tab ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          <Bookmark size={13} />
          <span>SAVED</span>
        </div>

        <div
          className={`profile-tab ${activeTab === 'tagged' ? 'active' : ''}`}
          onClick={() => setActiveTab('tagged')}
        >
          <Tag size={13} />
          <span>TAGGED</span>
        </div>
      </div>

      {/* Grid of Posts */}
      <div className="profile-posts-grid">
        {displayedPosts.length === 0 ? (
          <div
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '60px 20px',
              color: 'var(--text-secondary)'
            }}
          >
            No posts found in this tab.
          </div>
        ) : (
          displayedPosts.map((post) => (
            <div
              key={post.id}
              className="grid-item"
              onClick={() => onOpenDetail(post)}
            >
              {post.mediaType === 'video' ? (
                <>
                  <img
                    src={post.poster || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80'}
                    alt="Video Thumbnail"
                    className="grid-media"
                  />
                  <div className="grid-indicator">
                    <Play size={18} fill="#fff" />
                  </div>
                </>
              ) : (
                <img
                  src={post.mediaUrl}
                  alt={post.caption}
                  className="grid-media"
                  loading="lazy"
                />
              )}

              {/* Hover Overlay with stats */}
              <div className="grid-overlay">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Heart size={20} fill="#fff" />
                  <span>{post.likes}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MessageCircle size={20} fill="#fff" />
                  <span>{post.comments ? post.comments.length : 0}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

