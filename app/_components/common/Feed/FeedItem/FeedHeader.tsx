import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import MoreHorizIcon from '../../../../_assets/icons/MoreHorizIcon';
import { timeSince } from '../../../../../utils/date';
import PostOptions from './PostOptions';
import { useOutsideClick } from '../../../../../hooks/useOutsideClick';

interface FeedHeaderProps {
  fullName?: string;
  job?: string;
  updatedAt?: Date;
  imageUrl?: string;
  postId: string;
  authorId: number;
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
  const router = useRouter();
  const [openFeedOptions, setOpenFeedOptions] = useState(false);
  const PostOptionsRef = useOutsideClick(() => setOpenFeedOptions(false));
  return (
    <div className="flex gap-x-4 mb-4 items-center">
      <div className="w-12" onClick={() => router.push(`/${authorId}`)} aria-hidden>
        <Image src={imageUrl || '/DefaultAvatar.svg'} width={48} height={48} alt="" unoptimized className="w-full h-full rounded-full cursor-pointer" />
      </div>
      <div>
        <div className="flex">
          <Link scroll={false} href={`/${authorId}`} className="cursor-pointer">{fullName}</Link>
          <div
            className="flex items-center justify-center text-xs font-normal opacity-80 before:content-['•'] before:color-[red] before:px-2"
            onClick={() => router.push(`/posts/${postId}`)}
            aria-hidden
          >
            <span className="hover:underline cursor-pointer">
              {timeSince(new Date(updatedAt!)) || ''}
            </span>
          </div>
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
