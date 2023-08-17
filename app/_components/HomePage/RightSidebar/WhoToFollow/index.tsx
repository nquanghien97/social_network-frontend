import React from 'react';
import Link from 'next/link';
import WhoToFollowItem from './WhoToFollowItem';

function WhoToFollow() {
  return (
    <div className="lg:mt-4">
      <div>
        <h5 className="text-xl px-5 pt-5">Who to follow</h5>
        <div className="p-5">
          <WhoToFollowItem />
          <WhoToFollowItem />
          <WhoToFollowItem />
          <div className="mt-4 flex">
            <Link href="/" className="text-center px-3 py-2 rounded bg-[#0f6fec1a] hover:bg-[#326de4] duration-300 w-full">View More</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhoToFollow;
