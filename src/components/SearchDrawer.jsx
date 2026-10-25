import React, { useState } from 'react';
import { Search, X, Hash, User, CheckCircle2 } from 'lucide-react';
import { SUGGESTIONS_LIST, COLLEGE_INFO } from '../data/mockData';

const SEARCH_DATABASE = [
  { type: 'user', username: COLLEGE_INFO.handle, name: COLLEGE_INFO.name, avatar: COLLEGE_INFO.avatar, verified: true },
  ...SUGGESTIONS_LIST.map((s) => ({ type: 'user', username: s.username, name: s.name, avatar: s.avatar, verified: true })),
  { type: 'tag', tag: '#Timelapse2026', count: '14.2K posts' },
  { type: 'tag', tag: '#SDBansal', count: '28.9K posts' },
  { type: 'tag', tag: '#SDBCTIndore', count: '9.4K posts' },
  { type: 'tag', tag: '#RGPVExams', count: '45.1K posts' },
  { type: 'tag', tag: '#TechCrafters', count: '3.8K posts' },
  { type: 'tag', tag: '#BGIPlacements', count: '7.2K posts' },
  { type: 'tag', tag: '#RauCampus', count: '5.1K posts' },
];

export function SearchDrawer({ isOpen, onClose, onSelectResult }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = SEARCH_DATABASE.filter((item) => {
    if (item.type === 'user') {
      return (
        item.username.toLowerCase().includes(query.toLowerCase()) ||
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      return item.tag.toLowerCase().includes(query.toLowerCase());
    }
  });

  return (
    <div className="flyout-drawer">
      <div style={{ padding: '24px 20px 14px 20px', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700' }}>Search</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-hover)',
            borderRadius: '8px',
            padding: '8px 12px',
            gap: '8px'
          }}
        >
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search Bansal campus, handles, tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              width: '100%',
              fontSize: '14px'
            }}
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
        <div style={{ padding: '4px 20px 10px 20px', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>
          {query ? 'Results' : 'Recent Bansal Highlights'}
        </div>

        {filtered.map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              onSelectResult(item);
              onClose();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 20px',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            {item.type === 'user' ? (
              <img
                src={item.avatar}
                alt={item.username}
                style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--bg-hover)'
                }}
              >
                <Hash size={20} />
              </div>
            )}

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600', fontSize: '14px' }}>
                <span>{item.type === 'user' ? item.username : item.tag}</span>
                {item.verified && <CheckCircle2 size={13} fill="#0095f6" color="#fff" />}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {item.type === 'user' ? item.name : item.count}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

