import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Heart, Send, CheckCircle2 } from 'lucide-react';

export function StoryViewerModal({ storyGroup, onClose, onNextGroup }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [floatingHearts, setFloatingHearts] = useState([]);
  const timerRef = useRef(null);

  const stories = storyGroup?.stories || [];
  const currentStory = stories[currentSlideIndex];

  // Story progression timer (5 seconds = 5000ms)
  useEffect(() => {
    if (!currentStory || isPaused) return;

    const intervalTime = 50; // update every 50ms
    const step = (intervalTime / 5000) * 100;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timerRef.current);
          handleNextSlide();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timerRef.current);
  }, [currentSlideIndex, isPaused, currentStory]);

  const handleNextSlide = () => {
    if (currentSlideIndex < stories.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      if (onNextGroup) {
        onNextGroup();
      } else {
        onClose();
      }
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
      setProgress(0);
    } else {
      setProgress(0);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNextSlide();
      if (e.key === 'ArrowLeft') handlePrevSlide();
      if (e.key === ' ') setIsPaused((prev) => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, stories.length]);

  const handleSendHeart = () => {
    const newHeart = {
      id: Date.now() + Math.random(),
      left: Math.floor(Math.random() * 60) + 20, // random percentage
    };
    setFloatingHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setReplyText('');
    handleSendHeart();
  };

  if (!storyGroup || !currentStory) return null;

  return (
    <div className="story-viewer-backdrop" onClick={onClose}>
      <div
        className="story-viewer-container"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Progress Bars */}
        <div className="story-progress-bar-container">
          {stories.map((st, idx) => {
            let fillWidth = '0%';
            if (idx < currentSlideIndex) fillWidth = '100%';
            if (idx === currentSlideIndex) fillWidth = `${progress}%`;

            return (
              <div key={st.id} className="story-progress-track">
                <div
                  className="story-progress-fill"
                  style={{ width: fillWidth }}
                />
              </div>
            );
          })}
        </div>

        {/* Top User Info Bar */}
        <div className="story-top-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={storyGroup.avatar}
              alt={storyGroup.username}
              style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontWeight: '600', fontSize: '13.5px' }}>{storyGroup.username}</span>
              {storyGroup.verified && (
                <CheckCircle2 size={13} fill="#0095f6" color="#fff" />
              )}
              <span style={{ opacity: 0.7, fontSize: '12px', marginLeft: '6px' }}>
                {currentStory.time}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsPaused(!isPaused)}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
              title={isPaused ? 'Resume' : 'Pause'}
            >
              {isPaused ? <Play size={18} fill="#fff" /> : <Pause size={18} fill="#fff" />}
            </button>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
              title="Close"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Media (Image or Video) */}
        <div
          style={{ width: '100%', height: '100%', position: 'relative' }}
        >
          {currentStory.type === 'video' ? (
            <video
              src={currentStory.mediaUrl}
              autoPlay
              muted
              playsInline
              loop
              className="story-media-view"
            />
          ) : (
            <img
              src={currentStory.mediaUrl}
              alt="Story"
              className="story-media-view"
            />
          )}

          {/* Left / Right click zones for navigation */}
          <div
            onClick={handlePrevSlide}
            style={{ position: 'absolute', top: 60, left: 0, width: '35%', height: 'calc(100% - 130px)', cursor: 'pointer' }}
          />
          <div
            onClick={handleNextSlide}
            style={{ position: 'absolute', top: 60, right: 0, width: '65%', height: 'calc(100% - 130px)', cursor: 'pointer' }}
          />

          {/* Story Caption Overlay */}
          {currentStory.caption && (
            <div
              style={{
                position: 'absolute',
                bottom: '70px',
                left: '14px',
                right: '14px',
                background: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(8px)',
                padding: '10px 14px',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '13.5px',
                lineHeight: '1.4'
              }}
            >
              {currentStory.caption}
            </div>
          )}

          {/* Floating Hearts */}
          {floatingHearts.map((h) => (
            <div
              key={h.id}
              className="floating-heart"
              style={{ left: `${h.left}%`, bottom: '80px' }}
            >
              <Heart size={36} fill="#ff3040" color="#ff3040" />
            </div>
          ))}
        </div>

        {/* Bottom Bar: Reply Input & Heart Reaction */}
        <div className="story-bottom-bar">
          <form
            onSubmit={handleReplySubmit}
            style={{ flex: 1, display: 'flex', alignItems: 'center' }}
          >
            <input
              type="text"
              className="story-reply-input"
              placeholder={`Reply to ${storyGroup.username}...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
            />
          </form>

          <button
            onClick={handleSendHeart}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px'
            }}
          >
            <Heart size={26} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}

