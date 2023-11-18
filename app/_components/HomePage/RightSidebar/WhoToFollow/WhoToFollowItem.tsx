import { useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Link from 'next/link';
import DefaultAvatar from '../../../../_assets/DefaultAvatar.svg';
import PlusIcon from '../../../../_assets/icons/PlusIcon';
import { addFriend } from '@/services/friend.services';
import LoadingIcon from '../../../../_assets/icons/LoadingIcon';
import CheckIcon from '../../../../_assets/icons/CheckIcon';

interface WhoToFollowItemProps {
  imageUrl: string;
  fullName: string;
  job: string;
  friendId: number;
}

function WhoToFollowItem(props: WhoToFollowItemProps) {
  const {
    imageUrl, fullName, job, friendId,
  } = props;
  const [loading, setLoading] = useState({
    loading: false,
    addedFriend: false,
  });
  const onAddFriend = async () => {
    setLoading({
      loading: true,
      addedFriend: false,
    });
    try {
      await addFriend(friendId);
    } catch (err) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading({
        loading: false,
        addedFriend: true,
      });
    }
  };
  const statusFriend = () => {
    if (loading.loading) {
      return (
        <LoadingIcon />
      );
    }
    if (loading.addedFriend) {
      return <CheckIcon fill="#0f6fec" width={16} height={16} />;
    }
    return (
      <div
        onClick={onAddFriend}
        aria-hidden
        className="w-full h-full flex items-center justify-center"
      >
        <PlusIcon fill="#0f6fec" width={16} height={16} />
      </div>
    );
  };
  return (
    <div className="flex gap-x-4 mb-4 items-center text-sm">
      <div className="w-10 shrink-0">
        <Image src={imageUrl || DefaultAvatar} alt="" className="w-full h-full rounded-full cursor-pointer" unoptimized width={48} height={48} />
      </div>
      <div className="w-full">
        <Link scroll={false} href="/" className="cursor-pointer">{fullName}</Link>
        <p>{job}</p>
      </div>
      <div
        className="h-10 w-10 bg-[#0f6fec1a] ml-auto rounded-full flex items-center justify-center hover:bg-[#a1a1a7] duration-300 cursor-pointer shrink-0"
      >
        {statusFriend()}
      </div>
    </div>
  );
}

export default WhoToFollowItem;
