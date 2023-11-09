import Image from 'next/image';
import Link from 'next/link';
import DefaultAvatar from '../../../../_assets/DefaultAvatar.svg';
import PlusIcon from '../../../../_assets/icons/PlusIcon';

interface WhoToFollowItemProps {
  imageUrl: string;
  fullName: string;
  job: string;
}

function WhoToFollowItem(props: WhoToFollowItemProps) {
  const { imageUrl, fullName, job } = props;
  return (
    <div className="flex gap-x-4 mb-4 items-center text-sm">
      <div className="w-10 shrink-0">
        <Image src={imageUrl || DefaultAvatar} alt="" className="w-full h-full rounded-full cursor-pointer" unoptimized width={48} height={48} />
      </div>
      <div className="w-full">
        <Link scroll={false} href="/" className="cursor-pointer">{fullName}</Link>
        <p>{job}</p>
      </div>
      <div className="h-10 w-10 bg-[#0f6fec1a] ml-auto rounded-full flex items-center justify-center hover:bg-[#a1a1a7] duration-300 cursor-pointer shrink-0">
        <PlusIcon fill="#0f6fec" width={16} height={16} />
      </div>
    </div>
  );
}

export default WhoToFollowItem;
