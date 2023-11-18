'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllFriends, removeFriend } from '@/services/friend.services';
import ListFriends from './ListFriends';

function Friend() {
  const [listFriends, setListFriends] = useState([]);
  useEffect(() => {
    const fetchListFriends = async () => {
      try {
        const res = await getAllFriends();
        setListFriends(res.listFriends);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchListFriends();
  }, []);

  const onRemoveFriend = async (idFriend: number) => {
    try {
      await removeFriend(idFriend);
      const res = await getAllFriends();
      setListFriends(res.listFriends);
      toast.success('Xóa bạn thành công');
    } catch (err) {
      console.log(err.message);
      toast.error('Xóa bạn thất bại');
    }
  };
  return (
    <div className="lg:container mx-auto h-full px-3 bg-[#0f0f10] rounded-md w-full">
      <div className="px-5 pt-5">
        <h5 className="text-2xl font-bold">Friends</h5>
      </div>
      {listFriends.length ? (
        <ListFriends listFriends={listFriends} onRemoveFriend={onRemoveFriend} />
      ) : (
        <p className="p-5 text-center text-2xl">Bạn chưa có người bạn nào</p>
      )}
    </div>
  );
}

export default Friend;
