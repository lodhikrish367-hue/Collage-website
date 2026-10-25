import React, { useState, useRef } from 'react';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Volume2,
  VolumeX,
  Play,
  Pause,
  CheckCircle2,
  Smile
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function PostCard({
  post,
  onLikeToggle,
  onSaveToggle,
  onAddComment,
  onOpenDetail,
  onOpenProfile,
  onSharePost
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [showPlayAnim, setShowPlayAnim] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const videoRef = useRef(null);

  const handleVideoClick = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
    setShowPlayAnim(true);
    setTimeout(() => setShowPlayAnim(false), 700);
  };

  const handleMuteToggle = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleMediaDoubleClick = (e) => {
    e.stopPropagation();
    if (!post.isLiked) {
      onLikeToggle(post.id);
      try {
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (err) {}
    }
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 850);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText.trim());
    setCommentText('');
  };

  const quickEmoji = (emoji) => {
    setCommentText((prev) => prev + emoji);
  };

  return (
    <article className="post-card">
      {/* Header */}
      <div className="post-header">
        <div className="post-user-info">
          <img
            src={post.user.avatar}
            alt={post.user.username}
            className="post-avatar"
            onClick={() => onOpenProfile(post.user.username)}
          />
          <div className="post-user-names">
            <div
              className="post-username-row"
              onClick={() => onOpenProfile(post.user.username)}
            >
              <span>{post.user.username}</span>
              {post.user.verified && (
                <CheckCircle2 className="verified-icon" fill="currentColor" color="#fff" />
              )}
            </div>
            {post.user.location && (
              <span className="post-location">{post.user.location}</span>
            )}
          </div>
        </div>

        <button
          className="action-btn"
          aria-label="More options"
          onClick={() => onSharePost(post)}
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Media with Double-Click Heart */}
      <div
        className="post-media-container"
        onDoubleClick={handleMediaDoubleClick}
      >
        {post.mediaType === 'video' ? (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <video
              ref={videoRef}
              src={post.mediaUrl}
              poster={post.poster}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              className="post-media-video"
              onClick={handleVideoClick}
            />

            {/* Play/Pause Animation Overlay */}
            {showPlayAnim && (
              <div className="video-play-indicator">
                {isPlaying ? <Play size={32} fill="#fff" /> : <Pause size={32} fill="#fff" />}
              </div>
            )}

            {/* Video Controls: Mute/Unmute */}
            <div className="video-overlay-controls">
              <button
                className="video-control-btn"
                onClick={handleMuteToggle}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>
          </div>
        ) : (
          <img
            src={post.mediaUrl}
            alt={post.caption}
            className="post-media-img"
            loading="lazy"
          />
        )}

        {/* Double-tap pop-up heart */}
        {showHeartAnim && (
          <div className="double-tap-heart">
            <Heart size={90} fill="#ff3040" color="#ff3040" />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="post-actions">
        <div className="post-actions-left">
          <button
            className={`action-btn ${post.isLiked ? 'liked' : ''}`}
            onClick={() => onLikeToggle(post.id)}
            aria-label="Like"
          >
            <Heart
              size={24}
              fill={post.isLiked ? '#ff3040' : 'none'}
              color={post.isLiked ? '#ff3040' : 'currentColor'}
            />
          </button>

          <button
            className="action-btn"
            onClick={() => onOpenDetail(post)}
            aria-label="Comment"
          >
            <MessageCircle size={24} />
          </button>

          <button
            className="action-btn"
            onClick={() => onSharePost(post)}
            aria-label="Share"
          >
            <Send size={24} />
          </button>
        </div>

        <button
          className={`action-btn ${post.isSaved ? 'saved' : ''}`}
          onClick={() => onSaveToggle(post.id)}
          aria-label="Save"
        >
          <Bookmark
            size={24}
            fill={post.isSaved ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      {/* Likes */}
      <div className="post-likes">
        {post.likes.toLocaleString()} likes
      </div>

      {/* Caption */}
      <div className="post-caption">
        <span
          className="caption-username"
          onClick={() => onOpenProfile(post.user.username)}
        >
          {post.user.username}
        </span>
        <span>
          {isExpanded || post.caption.length <= 130 ? (
            post.caption
          ) : (
            <>
              {post.caption.slice(0, 130)}...{' '}
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '13.5px'
                }}
                onClick={() => setIsExpanded(true)}
              >
                more
              </button>
            </>
          )}
        </span>
      </div>

      {/* Comments Count & Previews */}
      {post.comments && post.comments.length > 0 && (
        <button
          className="view-comments-btn"
          onClick={() => onOpenDetail(post)}
        >
          View all {post.comments.length} comments
        </button>
      )}

      {/* Preview latest comments */}
      {post.comments && post.comments.slice(-2).map((c) => (
        <div
          key={c.id}
          style={{
            padding: '2px 14px',
            fontSize: '13.5px',
            lineHeight: '1.4'
          }}
        >
          <span style={{ fontWeight: '600', marginRight: '6px' }}>{c.user}</span>
          <span>{c.text}</span>
        </div>
      ))}

      {/* Timestamp */}
      <div className="post-timestamp">
        {post.timeAgo}
      </div>

      {/* Add Comment Input */}
      <form className="add-comment-box" onSubmit={handleCommentSubmit}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => quickEmoji('❤️')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px' }}
          >
            ❤️
          </button>
          <button
            type="button"
            onClick={() => quickEmoji('🔥')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px' }}
          >
            🔥
          </button>
          <button
            type="button"
            onClick={() => quickEmoji('👏')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px' }}
          >
            👏
          </button>
        </div>

        <input
          type="text"
          className="comment-input"
          placeholder="Add a comment for Bansalites..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <button
          type="submit"
          className="comment-submit-btn"
          disabled={!commentText.trim()}
        >
          Post
        </button>
      </form>
    </article>
  );
}

