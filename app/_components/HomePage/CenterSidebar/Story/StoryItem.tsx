import React from 'react';
import Image from 'next/image';

function StoryItem() {
  return (
    <div className="w-36 h-[150px] mb-1 max-w-full inline-block mr-2 text-center">
      <Image className="rounded-md" src="https://social.webestica.com/assets/images/post/1by1/02.jpg" width={144} height={150} alt="" />
    </div>
  );
}

export default StoryItem;
