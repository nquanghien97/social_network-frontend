import React from 'react';
import Link from 'next/link';
import WhoToFollowItem from './WhoToFollowItem';
import BaseButton from '../../../common/BaseButton';

function WhoToFollow() {
  return (
    <div className="lg:mt-4">
      <div>
        <h5 className="text-xl px-5 pt-5">Who to follow</h5>
        <div className="p-5">
          <WhoToFollowItem />
          <WhoToFollowItem />
          <WhoToFollowItem />
          <BaseButton
            className="mt-4 flex"
          >
            <Link href="/" className="">View More</Link>
          </BaseButton>
        </div>
      </div>
    </div>
  );
}

export default WhoToFollow;
