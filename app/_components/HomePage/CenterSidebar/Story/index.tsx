import React from 'react';
import StoryItem from './StoryItem';
import PostStory from './PostStory';

function Story() {
  return (
    <div className="flex gap-2 w-full">
      <PostStory />
      <div className="whitespace-nowrap overflow-x-auto style-1">
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
      </div>
    </div>
  );
}

export default Story;
