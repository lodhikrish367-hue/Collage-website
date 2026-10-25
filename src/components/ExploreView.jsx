import React from 'react';
import { EXPLORE_POSTS } from '../data/mockData';
import { Play, Heart, MessageCircle } from 'lucide-react';

export function ExploreView({ onSelectExplorePost }) {
  return (
    <div className="explore-container">
      <div className="profile-posts-grid">
        {EXPLORE_POSTS.map((item) => (
          <div
            key={item.id}
            className="grid-item"
            onClick={() => onSelectExplorePost(item)}
          >
            <img
              src={item.thumb}
              alt="Explore Media"
              className="grid-media"
              loading="lazy"
            />

            {item.type === 'video' && (
              <div className="grid-indicator">
                <Play size={18} fill="#fff" />
              </div>
            )}

            {/* Hover Overlay */}
            <div className="grid-overlay">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Heart size={20} fill="#fff" />
                <span>{item.likes}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MessageCircle size={20} fill="#fff" />
                <span>{item.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

