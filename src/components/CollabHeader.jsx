import React from 'react';
import { Sparkles, ExternalLink, School } from 'lucide-react';

export function CollabHeader({ onOpenProfile }) {
  return (
    <div className="collab-banner">
      <div className="collab-tag">
        <School size={16} />
        <span>Official Collaboration: <strong>Sushila Devi Bansal College, Indore (SDBCT & SDBCE)</strong> × Instagram Web Edition</span>
        <span className="collab-pill">Affiliated to RGPV & DAVV</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px' }}>
        <button
          onClick={onOpenProfile}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontWeight: '600'
          }}
        >
          <Sparkles size={14} color="#fcd34d" /> View Official College Profile
        </button>
        <a
          href="https://sdbc.ac.in"
          target="_blank"
          rel="noreferrer"
          style={{
            color: '#e0e7ff',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            textDecoration: 'none',
            fontWeight: '500'
          }}
        >
          sdbc.ac.in <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}

