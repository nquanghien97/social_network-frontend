import Image from 'next/image';
import Link from 'next/link';
import DefaultAvatar from '../../../../_assets/DefaultAvatar.svg';
import PlusIcon from '../../../../_assets/icons/PlusIcon';

function WhoToFollowItem() {
  return (
    <div className="flex gap-x-4 mb-4 items-center">
      <div className="h-12 w-12">
        <Image src={DefaultAvatar} alt="" className="w-full h-full rounded-full cursor-pointer" />
      </div>
      <div>
        <Link scroll={false} href="/" className="cursor-pointer">Name</Link>
        <p>Description</p>
      </div>
      <div className="h-10 w-10 bg-[#0f6fec1a] ml-auto rounded-full flex items-center justify-center hover:bg-[#a1a1a7] duration-300 cursor-pointer">
        <PlusIcon fill="#0f6fec" width={16} height={16} />
      </div>
    </div>
  );
}

export default WhoToFollowItem;
