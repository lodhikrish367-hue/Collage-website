import React from 'react';
import { CURRENT_USER } from '../data/mockData';
import { CheckCircle2 } from 'lucide-react';

export function RightSidebar({
  suggestions,
  onFollowToggle,
  onOpenProfile,
  onSwitchUser
}) {
  return (
    <aside className="suggestions-sidebar">
      {/* Current User Card */}
      <div className="current-user-card">
        <div className="current-user-left">
          <img
            src={CURRENT_USER.avatar}
            alt={CURRENT_USER.username}
            className="current-user-avatar"
            onClick={() => onOpenProfile('profile')}
            style={{ cursor: 'pointer' }}
          />
          <div className="current-user-names">
            <span
              className="current-username"
              onClick={() => onOpenProfile('profile')}
              style={{ cursor: 'pointer' }}
            >
              {CURRENT_USER.username}
            </span>
            <span className="current-user-subtitle">{CURRENT_USER.role}</span>
            <span style={{ fontSize: '11px', color: 'var(--college-gold)', fontWeight: '600' }}>
              📍 {CURRENT_USER.college}
            </span>
          </div>
        </div>
        <button className="switch-btn" onClick={onSwitchUser}>
          Switch
        </button>
      </div>

      {/* Suggestions Header */}
      <div className="suggestions-header">
        <span>Suggested for you</span>
        <button className="see-all-btn" onClick={() => onOpenProfile('profile')}>
          See All
        </button>
      </div>

      {/* Suggested Users List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {suggestions.map((item) => (
          <div key={item.id} className="suggestion-item">
            <div className="suggestion-left">
              <img
                src={item.avatar}
                alt={item.username}
                className="suggestion-avatar"
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13.5px', fontWeight: '600' }}>
                  <span>{item.username}</span>
                  {item.username.includes('bansal') || item.username.includes('timelapse') || item.username.includes('rgpv') ? (
                    <CheckCircle2 size={13} fill="#0095f6" color="#fff" />
                  ) : null}
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {item.relation}
                </span>
              </div>
            </div>

            <button
              className={`follow-btn ${item.isFollowing ? 'following' : ''}`}
              onClick={() => onFollowToggle(item.id)}
            >
              {item.isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>

      {/* Instagram Web x Bansal Collab Footer */}
      <div className="suggestions-footer">
        <p style={{ marginBottom: '8px' }}>
          About • Help • Press • API • Jobs • Privacy • Terms • Locations • Language • Meta Verified
        </p>
        <p style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>
          © 2026 INSTAGRAM FROM META
        </p>
        <p style={{ fontSize: '10.5px', marginTop: '4px', color: 'var(--text-muted)' }}>
          In official collaboration with <strong>Sushila Devi Bansal College, Indore (SDBCT & SDBCE)</strong>
        </p>
      </div>
    </aside>
  );
}

