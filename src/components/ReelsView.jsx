import React, { useState, useRef } from 'react';
import { REELS_DATA } from '../data/mockData';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  Music,
  CheckCircle2
} from 'lucide-react';

export function ReelsView({ onSharePost, onOpenMessages }) {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [likesState, setLikesState] = useState(
    REELS_DATA.map((r) => ({ id: r.id, liked: false }))
  );
  const videoRefs = useRef([]);

  const currentReel = REELS_DATA[currentReelIndex];

  const handleNext = () => {
    if (currentReelIndex < REELS_DATA.length - 1) {
      setCurrentReelIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentReelIndex > 0) {
      setCurrentReelIndex((prev) => prev - 1);
    }
  };

  const handleLike = (id) => {
    setLikesState((prev) =>
      prev.map((item) => (item.id === id ? { ...item, liked: !item.liked } : item))
    );
  };

  const isLiked = likesState.find((l) => l.id === currentReel?.id)?.liked;

  return (
    <div className="reels-container">
      {/* Up/Down Reel navigation buttons */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={handlePrev}
          disabled={currentReelIndex === 0}
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: currentReelIndex === 0 ? 'default' : 'pointer',
            opacity: currentReelIndex === 0 ? 0.3 : 1
          }}
          title="Previous Reel"
        >
          <ChevronUp size={20} />
        </button>

        <button
          onClick={handleNext}
          disabled={currentReelIndex === REELS_DATA.length - 1}
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: currentReelIndex === REELS_DATA.length - 1 ? 'default' : 'pointer',
            opacity: currentReelIndex === REELS_DATA.length - 1 ? 0.3 : 1
          }}
          title="Next Reel"
        >
          <ChevronDown size={20} />
        </button>
      </div>

      {/* Reel Card */}
      <div className="reel-card">
        <div className="reel-video-wrapper">
          <video
            ref={(el) => (videoRefs.current[currentReelIndex] = el)}
            src={currentReel.videoUrl}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            className="reel-video"
            onClick={() => setIsMuted(!isMuted)}
          />

          {/* Reel Content Overlay */}
          <div className="reel-overlay-info">
            <div className="reel-user-row">
              <img
                src={currentReel.user.avatar}
                alt={currentReel.user.username}
                className="reel-avatar"
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="reel-username">{currentReel.user.username}</span>
                {currentReel.user.verified && (
                  <CheckCircle2 size={13} fill="#0095f6" color="#fff" />
                )}
              </div>
            </div>

            <p className="reel-caption">{currentReel.caption}</p>

            <div className="reel-audio">
              <Music size={14} />
              <span>{currentReel.audioTrack}</span>
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="reel-sidebar-actions">
          <button
            className="reel-action-btn"
            onClick={() => handleLike(currentReel.id)}
          >
            <Heart
              size={26}
              fill={isLiked ? '#ff3040' : 'none'}
              color={isLiked ? '#ff3040' : 'currentColor'}
            />
            <span>{isLiked ? '8.5K' : currentReel.likes}</span>
          </button>

          <button
            className="reel-action-btn"
            onClick={onOpenMessages}
          >
            <MessageCircle size={26} />
            <span>{currentReel.comments}</span>
          </button>

          <button
            className="reel-action-btn"
            onClick={() => onSharePost(currentReel)}
          >
            <Send size={26} />
            <span>{currentReel.shares}</span>
          </button>

          <button
            className="reel-action-btn"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
}

