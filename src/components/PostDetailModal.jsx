import React, { useState } from 'react';
import {
  X,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  CheckCircle2,
  Volume2,
  VolumeX
} from 'lucide-react';

export function PostDetailModal({
  post,
  onClose,
  onLikeToggle,
  onSaveToggle,
  onAddComment,
  onOpenProfile,
  onSharePost
}) {
  const [commentInput, setCommentInput] = useState('');
  const [isMuted, setIsMuted] = useState(true);

  if (!post) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(post.id, commentInput.trim());
    setCommentInput('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        style={{
          maxWidth: '960px',
          height: '620px',
          flexDirection: 'row',
          padding: 0
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Media View */}
        <div
          style={{
            flex: 1.2,
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {post.mediaType === 'video' ? (
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <video
                src={post.mediaUrl}
                poster={post.poster}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
              <button
                className="video-control-btn"
                style={{ position: 'absolute', bottom: 16, right: 16 }}
                onClick={() => setIsMuted(!isMuted)}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>
          ) : (
            <img
              src={post.mediaUrl}
              alt={post.caption}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          )}
        </div>

        {/* Right: Info & Comments Column */}
        <div
          style={{
            flex: 0.9,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--card-bg)'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '14px 16px',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={post.user.avatar}
                alt={post.user.username}
                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => {
                  onClose();
                  onOpenProfile(post.user.username);
                }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600', fontSize: '14px' }}>
                  <span>{post.user.username}</span>
                  {post.user.verified && (
                    <CheckCircle2 size={14} fill="#0095f6" color="#fff" />
                  )}
                </div>
                {post.user.location && (
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {post.user.location}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Comments & Caption */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            {/* Caption */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <img
                src={post.user.avatar}
                alt={post.user.username}
                style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ fontSize: '13.5px', lineHeight: '1.45' }}>
                <span style={{ fontWeight: '600', marginRight: '6px' }}>{post.user.username}</span>
                <span>{post.caption}</span>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {post.timeAgo}
                </div>
              </div>
            </div>

            {/* List of comments */}
            {post.comments?.map((c) => (
              <div key={c.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-hover)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '12px',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {c.user.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, fontSize: '13.5px', lineHeight: '1.4' }}>
                  <span style={{ fontWeight: '600', marginRight: '6px' }}>{c.user}</span>
                  <span>{c.text}</span>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {c.time || 'Just now'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions Bar */}
          <div style={{ borderTop: '1px solid var(--border-color)', padding: '10px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <button
                  className="action-btn"
                  onClick={() => onLikeToggle(post.id)}
                >
                  <Heart
                    size={24}
                    fill={post.isLiked ? '#ff3040' : 'none'}
                    color={post.isLiked ? '#ff3040' : 'currentColor'}
                  />
                </button>
                <button
                  className="action-btn"
                  onClick={() => onSharePost(post)}
                >
                  <Send size={24} />
                </button>
              </div>
              <button
                className="action-btn"
                onClick={() => onSaveToggle(post.id)}
              >
                <Bookmark
                  size={24}
                  fill={post.isSaved ? 'currentColor' : 'none'}
                />
              </button>
            </div>

            <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>
              {post.likes.toLocaleString()} likes
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              {post.timeAgo}
            </div>
          </div>

          {/* Add Comment Input */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              borderTop: '1px solid var(--border-color)',
              padding: '12px 16px',
              gap: '10px'
            }}
          >
            <input
              type="text"
              placeholder="Add a comment..."
              className="comment-input"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button
              type="submit"
              className="comment-submit-btn"
              disabled={!commentInput.trim()}
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

