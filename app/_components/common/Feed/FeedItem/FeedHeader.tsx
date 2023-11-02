import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MoreHorizIcon from '../../../../_assets/icons/MoreHorizIcon';
import { timeSince } from '../../../../../utils/date';
import PostOptions from './PostOptions';
import { useOutsideClick } from '../../../../_hooks/useOutsideClick';

interface FeedHeaderProps {
  fullName?: string;
  job?: string;
  updatedAt?: Date;
  imageUrl?: string;
  postId: string;
  hasDeletePost?: boolean;
}

function FeedHeader(props: FeedHeaderProps) {
  const {
    fullName,
    job,
    updatedAt,
    imageUrl,
    postId,
    hasDeletePost,
  } = props;

  const [openFeedOptions, setOpenFeedOptions] = useState(false);
  const PostOptionsRef = useOutsideClick(() => setOpenFeedOptions(false));

  return (
    <div className="flex gap-x-4 mb-4 items-center">
      <div className="w-12">
        <Image src={imageUrl || '/DefaultAvatar.svg'} width={48} height={48} alt="" unoptimized className="w-full h-full rounded-full cursor-pointer" />
      </div>
      <div>
        <div className="flex">
          <Link scroll={false} href="/" className="cursor-pointer">{fullName}</Link>
          <span className="flex items-center justify-center text-xs font-normal opacity-80 before:content-['•'] before:color-[red] before:px-2">{timeSince(new Date(updatedAt!)) || ''}</span>
        </div>
        <p className="text-xs font-normal opacity-80">{job}</p>
      </div>
      <div
        className="h-10 w-10 bg-[#0f6fec1a] ml-auto rounded-full flex items-center justify-center hover:bg-[#a1a1a7] duration-300 cursor-pointer relative"
        aria-hidden
        onClick={() => setOpenFeedOptions(true)}
      >
        <div>
          <MoreHorizIcon fill="#0f6fec" width={16} height={16} />
        </div>
        {openFeedOptions && <PostOptions PostOptionsRef={PostOptionsRef} setOpenFeedOptions={setOpenFeedOptions} postId={postId} hasDeletePost={hasDeletePost} />}
      </div>
    </div>
  );
}

export default FeedHeader;
