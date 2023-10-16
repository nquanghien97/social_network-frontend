import Image from 'next/image';
import Link from 'next/link';
import MoreHorizIcon from '../../../../../_assets/icons/MoreHorizIcon';

function FeedHeader() {
  return (
    <div className="flex gap-x-4 mb-4 items-center">
      <div className="h-12 w-12">
        <Image src="https://social.webestica.com/assets/images/post/1by1/02.jpg" width={48} height={48} alt="" className="w-full h-full rounded-full cursor-pointer" />
      </div>
      <div>
        <div className="flex">
          <Link scroll={false} href="/" className="cursor-pointer">Name</Link>
          <span className="flex items-center justify-center text-xs font-normal opacity-80 before:content-['•'] before:color-[red] before:px-2">2hr</span>
        </div>
        <p className="text-xs font-normal opacity-80">Description</p>
      </div>
      <div className="h-10 w-10 bg-[#0f6fec1a] ml-auto rounded-full flex items-center justify-center hover:bg-[#a1a1a7] duration-300 cursor-pointer">
        <MoreHorizIcon fill="#0f6fec" width={16} height={16} />
      </div>
    </div>
  );
}

export default FeedHeader;
