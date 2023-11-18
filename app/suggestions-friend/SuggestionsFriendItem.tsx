import React, { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import BaseButton from '../_components/common/BaseButton';
import LoadingIcon from '../_assets/icons/LoadingIcon';
import { addFriend } from '@/services/friend.services';
import CheckIcon from '../_assets/icons/CheckIcon';

interface SuggestionsFriendItemProps {
  imageUrl: string;
  fullName: string;
  measureRef: (node: HTMLDivElement) => void;
  friendId: number;
}

function SuggestionsFriendItem(props: SuggestionsFriendItemProps) {
  const {
    imageUrl,
    fullName,
    measureRef,
    friendId,
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
      setLoading({
        loading: false,
        addedFriend: true,
      });
      toast.success('Thêm bạn thành công');
    } catch (err) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
      setLoading({
        loading: false,
        addedFriend: false,
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
      return (
        <div>
          <BaseButton
            disabled
          >
            Bạn Bè
            <CheckIcon />
          </BaseButton>
        </div>
      );
    }
    return (
      <div>
        <BaseButton
          onClick={onAddFriend}
          loading={loading.loading}
        >
          Thêm Bạn Bè
        </BaseButton>
      </div>
    );
  };
  return (
    <div ref={measureRef} className="max-w-[250px] min-w-[200px] flex flex-1 flex-col bg-[#0f0f10] p-5 rounded-md">
      <div className="flex flex-1">
        <Image src={imageUrl || 'DefaultAvatar.svg'} alt="" width={100} height={100} className="w-full" />
      </div>
      <div className="py-2">
        <p>{fullName}</p>
      </div>
      {statusFriend()}
    </div>
  );
}

export default SuggestionsFriendItem;
