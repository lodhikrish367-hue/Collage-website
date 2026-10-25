import React from 'react';
import { StoriesBar } from './StoriesBar';
import { PostCard } from './PostCard';

export function Feed({
  stories,
  posts,
  onSelectStory,
  onLikeToggle,
  onSaveToggle,
  onAddComment,
  onOpenDetail,
  onOpenProfile,
  onSharePost
}) {
  return (
    <div className="feed-column">
      {/* Stories Bar */}
      <StoriesBar
        stories={stories}
        onSelectStory={onSelectStory}
      />

      {/* Posts Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLikeToggle={onLikeToggle}
            onSaveToggle={onSaveToggle}
            onAddComment={onAddComment}
            onOpenDetail={onOpenDetail}
            onOpenProfile={onOpenProfile}
            onSharePost={onSharePost}
          />
        ))}
      </div>
    </div>
  );
}

