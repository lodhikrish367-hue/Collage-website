import React, { useState } from 'react';
import { X, Heart, MessageCircle, UserPlus, Sparkles } from 'lucide-react';
import { NOTIFICATIONS_DATA } from '../data/mockData';

export function NotificationsPanel({ isOpen, onClose }) {
  const [notifs, setNotifs] = useState(NOTIFICATIONS_DATA);

  if (!isOpen) return null;

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="flyout-drawer">
      <div style={{ padding: '24px 20px 14px 20px', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700' }}>Notifications</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={markAllRead}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-blue)',
                fontSize: '12.5px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Mark all read
            </button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
        <div style={{ padding: '4px 20px 8px 20px', fontSize: '13px', fontWeight: '700' }}>
          This Week
        </div>

        {notifs.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 20px',
              backgroundColor: item.read ? 'transparent' : 'rgba(0, 149, 246, 0.05)',
              transition: 'background-color 0.15s ease',
              cursor: 'pointer'
            }}
          >
            <div style={{ position: 'relative' }}>
              <img
                src={item.user.avatar}
                alt={item.user.username}
                style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: -2,
                  right: -2,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: item.type === 'like' ? 'var(--accent-red)' : 'var(--accent-blue)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {item.type === 'like' ? <Heart size={10} fill="#fff" /> : <UserPlus size={10} />}
              </div>
            </div>

            <div style={{ flex: 1, fontSize: '13px', lineHeight: '1.4' }}>
              <span style={{ fontWeight: '600' }}>{item.user.username} </span>
              <span>{item.text} </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '11.5px' }}>{item.time}</span>
            </div>

            {item.type === 'follow' && (
              <button
                className="profile-action-btn primary"
                style={{ padding: '5px 12px', fontSize: '12px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Followed back ${item.user.username}`);
                }}
              >
                Follow
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

