import React, { useState } from 'react';
import { DIRECT_CHATS, CURRENT_USER } from '../data/mockData';
import { CheckCircle2, Send, Smile, Phone, Video, Info } from 'lucide-react';

export function MessagesView() {
  const [chats, setChats] = useState(DIRECT_CHATS);
  const [activeChatId, setActiveChatId] = useState(DIRECT_CHATS[0].id);
  const [inputText, setInputText] = useState('');

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputText.trim(),
      time: 'Just now'
    };

    // Update messages
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? { ...c, messages: [...c.messages, newMsg] }
          : c
      )
    );
    const sentText = inputText.trim();
    setInputText('');

    // Simulate authentic response from Bansal College handles
    setTimeout(() => {
      let replyText = "Thank you for connecting with SD Bansal College, Indore! Our campus cell has logged your query.";
      if (sentText.toLowerCase().includes('timelapse') || sentText.toLowerCase().includes('fest')) {
        replyText = "Timelapse 2026 entry passes will be distributed from the student activity center next week! Keep your college ID card ready! 🎉";
      } else if (sentText.toLowerCase().includes('admission') || sentText.toLowerCase().includes('fees')) {
        replyText = "Admissions are open for B.Tech (CSE, AI-ML, Cyber, DS) & MBA. You can reach our Rau campus helpline directly at 0731-4220600 or visit sdbc.ac.in 🎓";
      } else if (sentText.toLowerCase().includes('hackathon') || sentText.toLowerCase().includes('club')) {
        replyText = "Tech-Crafters meets every Tuesday and Thursday in Computing Lab 3. We'd love to have you onboard! 💻⚡";
      }

      const autoReply = {
        id: `msg-auto-${Date.now()}`,
        sender: activeChat.user.username,
        text: replyText,
        time: 'Just now'
      };

      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChatId
            ? { ...c, messages: [...c.messages, autoReply] }
            : c
        )
      );
    }, 1200);
  };

  return (
    <div className="messages-container">
      {/* Left Chat List */}
      <div className="chat-list-panel">
        <div className="chat-list-header">
          <span>{CURRENT_USER.username}</span>
          <span style={{ fontSize: '11px', color: 'var(--college-gold)', display: 'block', fontWeight: '500' }}>
            SD Bansal Direct Messages
          </span>
        </div>

        <div className="chat-items">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${chat.id === activeChatId ? 'active' : ''}`}
              onClick={() => setActiveChatId(chat.id)}
            >
              <div className="chat-avatar-wrapper">
                <img
                  src={chat.user.avatar}
                  alt={chat.user.username}
                  className="chat-avatar"
                />
                {chat.user.online && <div className="online-dot" />}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: '600' }}>
                  <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {chat.user.name}
                  </span>
                  {chat.user.verified && (
                    <CheckCircle2 size={13} fill="#0095f6" color="#fff" />
                  )}
                </div>
                <div
                  style={{
                    fontSize: '12.5px',
                    color: 'var(--text-secondary)',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    marginTop: '2px'
                  }}
                >
                  {chat.messages[chat.messages.length - 1]?.text || 'Started a conversation'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Conversation Panel */}
      <div className="chat-conversation-panel">
        {/* Header */}
        <div className="chat-conv-header">
          <img
            src={activeChat.user.avatar}
            alt={activeChat.user.username}
            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600', fontSize: '14px' }}>
              <span>{activeChat.user.name}</span>
              {activeChat.user.verified && (
                <CheckCircle2 size={14} fill="#0095f6" color="#fff" />
              )}
            </div>
            <span style={{ fontSize: '12px', color: activeChat.user.online ? '#10b981' : 'var(--text-secondary)' }}>
              {activeChat.user.online ? 'Active now' : 'Campus desk offline'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '16px', color: 'var(--text-primary)' }}>
            <Phone size={20} style={{ cursor: 'pointer' }} />
            <Video size={20} style={{ cursor: 'pointer' }} />
            <Info size={20} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        {/* Message Thread */}
        <div className="chat-conv-body">
          <div style={{ textAlign: 'center', margin: '16px 0', color: 'var(--text-muted)', fontSize: '12px' }}>
            Official chat thread with {activeChat.user.name} (SDBCT Indore)
          </div>

          {activeChat.messages.map((m) => {
            const isOutgoing = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`message-bubble ${isOutgoing ? 'outgoing' : 'incoming'}`}
              >
                <div>{m.text}</div>
                <div
                  style={{
                    fontSize: '10px',
                    opacity: 0.7,
                    textAlign: isOutgoing ? 'right' : 'left',
                    marginTop: '4px'
                  }}
                >
                  {m.time}
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Input */}
        <form className="chat-input-bar" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="comment-input"
            placeholder={`Message ${activeChat.user.name}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <button
            type="submit"
            className="action-btn"
            disabled={!inputText.trim()}
            style={{ color: inputText.trim() ? 'var(--accent-blue)' : 'var(--text-muted)' }}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

