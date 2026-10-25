import React from 'react';

export function StoriesBar({ stories, onSelectStory }) {
  return (
    <div className="stories-container">
      {stories.map((story) => (
        <div
          key={story.id}
          className="story-item"
          onClick={() => onSelectStory(story)}
        >
          <div className={`story-ring ${!story.hasUnseen ? 'seen' : ''}`}>
            <img
              src={story.avatar}
              alt={story.username}
              className="story-avatar-img"
              loading="lazy"
            />
          </div>
          <span className="story-username">
            {story.username}
          </span>
        </div>
      ))}
    </div>
  );
}

