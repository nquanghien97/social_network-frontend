import React from 'react';
import WhoToFollow from './WhoToFollow';
import NewsToday from './NewsToday';

function RightSidebar() {
  return (
    <div className="w-1/4 max-h-0 sticky top-14 lg:block hidden min-h-content">
      <div className="mt-4 bg-[#0f0f10] border border-[#0f0f10] rounded-md">
        <WhoToFollow />
      </div>
      <div className="mt-4 bg-[#0f0f10] border border-[#0f0f10] rounded-md">
        <NewsToday />
      </div>
    </div>
  );
}

export default RightSidebar;
