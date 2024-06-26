import { useState } from 'react';
import MoreHorizIcon from '@/assets/icons/MoreHorizIcon';
import { timeSince } from '@/utils/date';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import EarthIcon from '@/assets/icons/EarthIcon';
import NavLink from '@/components/common/NavLink';
import PostOptions from './PostOptions';
import UserAvatar from '../../UserAvatar';

interface FeedHeaderProps {
  fullName?: string;
  job?: string;
  updatedAt?: Date;
  imageUrl: string;
  postId: string;
  authorId: string;
}

function FeedHeader(props: FeedHeaderProps) {
  const {
    fullName,
    job,
    updatedAt,
    imageUrl,
    postId,
    authorId,
  } = props;
  const [openFeedOptions, setOpenFeedOptions] = useState(false);
  const PostOptionsRef = useOutsideClick(() => setOpenFeedOptions(false));
  return (
    <div className="flex gap-x-4 mb-4 items-center">
      <NavLink className="w-12 h-12" href={`/${authorId}`} aria-hidden>
        <UserAvatar imageUrl={imageUrl} />
      </NavLink>
      <div>
        <div className="flex max-sm:flex-col">
          <NavLink href={`/${authorId}`} className="cursor-pointer">{fullName}</NavLink>
          <NavLink
            className="flex items-center sm:justify-center text-xs font-normal opacity-80 sm:before:content-['•'] sm:before:color-[red] sm:before:px-2"
            href={`/posts/${postId}`}
            aria-hidden
          >
            <span className="hover:underline cursor-pointer">
              {timeSince(new Date(updatedAt!)) || ''}
            </span>
            <EarthIcon color="white" width={16} height={16} className="ml-1" />
          </NavLink>
        </div>
        <p className="text-xs font-normal opacity-80">{job}</p>
      </div>
      <div
        className="h-10 w-10 bg-[#0f6fec1a] ml-auto rounded-full flex items-center justify-center hover:bg-[#a1a1a7] duration-300 cursor-pointer relative"
        aria-hidden
      >
        <div
          onClick={() => setOpenFeedOptions(!openFeedOptions)}
          aria-hidden
          className="w-full h-full flex items-center justify-center"
        >
          <MoreHorizIcon fill="#0f6fec" width={16} height={16} />
        </div>
        {openFeedOptions && <PostOptions authorId={authorId} PostOptionsRef={PostOptionsRef} setOpenFeedOptions={setOpenFeedOptions} postId={postId} />}
      </div>
    </div>
  );
}

export default FeedHeader;
