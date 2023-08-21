import React from 'react';
import Story from './Story';
import PostFeed from './PostFeed';

function CenterSidebar() {
  return (
    <div className="mt-4 flex-1 lg:w-1/2 w-full px-3">
      <div className="flex justify-center items-center flex-col gap-y-2">
        <Story />
        <PostFeed />
      </div>
    </div>
  );
}

export default CenterSidebar;
