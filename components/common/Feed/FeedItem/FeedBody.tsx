import { useState } from 'react';
import Image from 'next/image';
import { likePost } from '@/services/like.services';
import { LikeEntity } from '@/entities/Post.entities';
import { useAuth } from '@/zustand/auth.store';
import LikeIcon from '@/assets/icons/LikeIcon';
import LikedIcon from '@/assets/icons/LikedIcon';
import MessageIcon from '@/assets/icons/MessageIcon';
import ShareIcon from '@/assets/icons/ShareIcon';

interface FeedBodyProps {
  title?: string;
  text?: string;
  imageUrl?: string;
  postId: string;
  liked: LikeEntity[];
  likeCount: number;
  commentsCount: number;
}

function FeedBody(props: FeedBodyProps) {
  const {
    title, text, imageUrl, postId, liked, likeCount, commentsCount,
  } = props;
  const { user } = useAuth();
  const likedId = liked?.map((item: LikeEntity) => item.userId);
  const [like, setLike] = useState(likedId.includes(user.id));
  const [likesCount, setLikesCount] = useState(likeCount);
  const onLikePost = async () => {
    try {
      const res = await likePost({ postId });
      if (res.data.status === 'like') {
        setLikesCount((prev) => prev + 1);
      } else {
        setLikesCount((prev) => prev - 1);
      }
      setLike(!like);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <div>
        <h2 className="text-2xl">{title}</h2>
        <p className="mb-4">{text}</p>
        {imageUrl ? (
          <Image
            src={imageUrl}
            width={100}
            height={100}
            priority
            className="w-full h-auto rounded-md"
            alt=""
            unoptimized
          />
        ) : null}
      </div>
      <div className="flex items-center justify-center gap-x-3 my-2 py-1 border-0 border-y-[1px] border-[#3E4042]">
        <div
          className="flex gap-1 px-4 py-1 hover:bg-[#0f6fec] rounded-md cursor-pointer duration-300"
          onClick={onLikePost}
          aria-hidden
        >
          {like ? (
            <LikedIcon />
          ) : (
            <LikeIcon />
          )}
          <span>Like</span>
          {!!likesCount && <span>{`(${likesCount})`}</span>}
        </div>
        <div className="flex gap-1 px-4 py-1 hover:bg-[#0f6fec] rounded-md cursor-pointer duration-300">
          <MessageIcon fill="#a1a1a7" width={24} height={24} />
          <span>Comment</span>
          {!!commentsCount && <span>{`(${commentsCount})`}</span>}
        </div>
        <div className="flex gap-1 ml-auto px-4 py-1 hover:bg-[#0f6fec] rounded-md cursor-pointer duration-300">
          <ShareIcon />
          <span>Share</span>
        </div>
      </div>
    </div>
  );
}

export default FeedBody;
