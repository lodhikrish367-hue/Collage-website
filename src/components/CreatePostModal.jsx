import React, { useState } from 'react';
import { X, Image, Video, Upload, MapPin, Sparkles } from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';

const DEMO_PRESETS = [
  {
    name: 'Fest Lights (Video)',
    type: 'video',
    url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    thumb: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=300&q=80',
    caption: 'Electrifying vibes from the annual fest stage! Central India turns up at SD Bansal Rau campus! 🌟 #Timelapse2026 #SDBansal #Indore'
  },
  {
    name: 'Robotics Lab',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1080&q=80',
    thumb: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80',
    caption: 'Late hours in the SDBCT IoT and Robotics innovation lab. Working on automated sensor networks! 🤖⚡ #TechCrafters #SDBCT #IndoreMakers'
  },
  {
    name: 'Central Library',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1080&q=80',
    thumb: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=300&q=80',
    caption: 'Study grind at the Central Digital Library ahead of end-semester evaluations. 📚💡 #Bansalites #RGPV #CampusDiaries'
  },
  {
    name: 'Hackathon Coding',
    type: 'video',
    url: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/face-demographics-walking.mp4',
    thumb: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=300&q=80',
    caption: 'Final countdown of the 36-Hour Hackathon! Mentors reviewing machine learning models. 💻🔥 #CodeBansal #HackSprint #AIML'
  }
];

export function CreatePostModal({ isOpen, onClose, onCreatePost }) {
  const [selectedMedia, setSelectedMedia] = useState(DEMO_PRESETS[0]);
  const [customUrl, setCustomUrl] = useState('');
  const [mediaType, setMediaType] = useState('video');
  const [caption, setCaption] = useState(DEMO_PRESETS[0].caption);
  const [location, setLocation] = useState('Sushila Devi Bansal College, Indore');

  if (!isOpen) return null;

  const handleSelectPreset = (preset) => {
    setSelectedMedia(preset);
    setMediaType(preset.type);
    setCaption(preset.caption);
    setCustomUrl('');
  };

  const handleCustomFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVid = file.type.startsWith('video');
      const url = URL.createObjectURL(file);
      setMediaType(isVid ? 'video' : 'image');
      setSelectedMedia({
        name: file.name,
        type: isVid ? 'video' : 'image',
        url: url
      });
    }
  };

  const handleCustomUrlSubmit = (e) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    const isVid = customUrl.endsWith('.mp4') || customUrl.endsWith('.webm') || customUrl.includes('video');
    setMediaType(isVid ? 'video' : 'image');
    setSelectedMedia({
      name: 'Custom URL',
      type: isVid ? 'video' : 'image',
      url: customUrl.trim()
    });
  };

  const handleShare = () => {
    const newPost = {
      id: `post-${Date.now()}`,
      user: {
        username: CURRENT_USER.username,
        name: CURRENT_USER.name,
        avatar: CURRENT_USER.avatar,
        verified: false,
        location: location
      },
      mediaType: mediaType,
      mediaUrl: selectedMedia.url,
      poster: selectedMedia.thumb || 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80',
      likes: 1,
      isLiked: true,
      isSaved: false,
      caption: caption,
      timeAgo: 'JUST NOW',
      comments: []
    };

    onCreatePost(newPost);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        style={{ maxWidth: '820px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
          >
            Cancel
          </button>
          <span style={{ fontWeight: '700' }}>Create New Campus Post</span>
          <button
            onClick={handleShare}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-blue)',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Share
          </button>
        </div>

        {/* Body */}
        <div style={{ display: 'flex', minHeight: '440px' }}>
          {/* Media Preview Area */}
          <div
            style={{
              flex: 1.2,
              backgroundColor: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            {mediaType === 'video' ? (
              <video
                src={selectedMedia.url}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', height: '100%', maxHeight: '440px', objectFit: 'contain' }}
              />
            ) : (
              <img
                src={selectedMedia.url}
                alt="Post Preview"
                style={{ width: '100%', height: '100%', maxHeight: '440px', objectFit: 'contain' }}
              />
            )}
          </div>

          {/* Configuration Column */}
          <div
            style={{
              flex: 1,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              backgroundColor: 'var(--card-bg)'
            }}
          >
            {/* User */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={CURRENT_USER.avatar}
                alt={CURRENT_USER.username}
                style={{ width: '32px', height: '32px', borderRadius: '50%' }}
              />
              <span style={{ fontWeight: '600', fontSize: '14px' }}>
                {CURRENT_USER.username}
              </span>
            </div>

            {/* Quick Presets */}
            <div>
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                Select Campus Demo Media:
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', marginTop: '6px' }}>
                {DEMO_PRESETS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectPreset(p)}
                    style={{
                      padding: '6px 8px',
                      borderRadius: '6px',
                      border: selectedMedia.url === p.url ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-hover)',
                      color: 'var(--text-primary)',
                      fontSize: '11.5px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {p.type === 'video' ? <Video size={13} /> : <Image size={13} />}
                    <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {p.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Upload or Custom URL */}
            <div style={{ display: 'flex', gap: '6px' }}>
              <label
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '6px',
                  borderRadius: '6px',
                  border: '1px dashed var(--border-color)',
                  cursor: 'pointer',
                  fontSize: '12px',
                  backgroundColor: 'var(--bg-hover)'
                }}
              >
                <Upload size={14} /> Upload File
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleCustomFileChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            {/* Caption Input */}
            <div>
              <textarea
                style={{
                  width: '100%',
                  height: '100px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  padding: '8px',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  fontSize: '13.5px',
                  outline: 'none',
                  resize: 'none'
                }}
                placeholder="Write a caption for Bansalites..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>

            {/* Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <MapPin size={16} />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: '13px'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

