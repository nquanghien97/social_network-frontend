import Image from 'next/image';
import LikeIcon from '../../../../../_assets/icons/LikeIcon';
import MessageIcon from '../../../../../_assets/icons/MessageIcon';
import ShareIcon from '../../../../../_assets/icons/ShareIcon';

interface FeedBodyProps {
  title?: string;
  text?: string;
  imageUrl?: string;
}

function FeedBody(props: FeedBodyProps) {
  const { title, text, imageUrl } = props;
  return (
    <div>
      <h2>{title}</h2>
      <p className="mb-4">{text}</p>
      <Image
        src={imageUrl || ''}
        width={100}
        height={100}
        className="w-full h-full rounded-md"
        alt=""
      />
      <div className="flex items-center justify-center gap-x-3 my-2">
        <div className="flex gap-1 px-4 py-1 hover:bg-[#0f6fec] rounded-md cursor-pointer duration-300">
          <LikeIcon />
          <span>Like</span>
        </div>
        <div className="flex gap-1 px-4 py-1 hover:bg-[#0f6fec] rounded-md cursor-pointer duration-300">
          <MessageIcon fill="#a1a1a7" width={29} height={29} />
          <span>Comment</span>
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
