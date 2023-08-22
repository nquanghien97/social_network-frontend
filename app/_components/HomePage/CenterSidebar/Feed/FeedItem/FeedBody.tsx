import Image from 'next/image';
import LikeIcon from '../../../../../_assets/icons/LikeIcon';
import MessageIcon from '../../../../../_assets/icons/MessageIcon';
import ShareIcon from '../../../../../_assets/icons/ShareIcon';
// import LikedIcon from '../../../../../_assets/icons/LikedIcon';

function FeedBody() {
  return (
    <div>
      <p className="mb-4">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. At asperiores ratione totam reprehenderit vel?
        Fuga natus odit eaque, consectetur, molestiae commodi doloremque dolor praesentium nulla molestias quasi. Explicabo, rerum nostrum?
      </p>
      <Image
        src="https://social.webestica.com/assets/images/post/1by1/02.jpg"
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
