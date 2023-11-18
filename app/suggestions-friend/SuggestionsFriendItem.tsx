import React from 'react';
import Image from 'next/image';
import BaseButton from '../_components/common/BaseButton';

interface SuggestionsFriendItemProps {
  imageUrl: string;
  fullName: string;
  measureRef: (node: HTMLDivElement) => void;
}

function SuggestionsFriendItem(props: SuggestionsFriendItemProps) {
  const { imageUrl, fullName, measureRef } = props;
  return (
    <div ref={measureRef} className="max-w-[250px] min-w-[200px] flex flex-1 flex-col bg-[#0f0f10] p-5 rounded-md">
      <div className="flex flex-1">
        <Image src={imageUrl || 'DefaultAvatar.svg'} alt="" width={100} height={100} className="w-full" />
      </div>
      <div className="py-2">
        <p>{fullName}</p>
      </div>
      <div>
        <BaseButton>Thêm Bạn Bè</BaseButton>
      </div>
    </div>
  );
}

export default SuggestionsFriendItem;
