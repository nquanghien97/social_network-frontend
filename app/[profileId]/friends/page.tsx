'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllFriends, getFriendsOfUser, removeFriend } from '@/services/friend.services';
import LoadingIcon from '@/assets/icons/LoadingIcon';
import { getUserId } from '@/services/user.services';
import ListFriends from './ListFriends';

function Friend() {
  const [listFriends, setListFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const profileId = param.profileId as string;
  const userId = getUserId();
  useEffect(() => {
    setLoading(true);
    setLoading(true);
    (async () => {
      try {
        if (userId === profileId) {
          const res = await getAllFriends(userId);
          setListFriends(res.listFriends);
          setLoading(false);
        } else {
          const res = await getFriendsOfUser(profileId);
          setListFriends(res.listFriends);
          setLoading(false);
        }
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    })();
  }, []);

  const onRemoveFriend = async (idFriend: string) => {
    try {
      await removeFriend(idFriend);
      toast.success('Xóa bạn thành công');
      const res = await getAllFriends(userId);
      setListFriends(res.listFriends);
    } catch (err) {
      toast.error('Xóa bạn thất bại');
    }
  };
  return (
    <div className="lg:container mx-auto h-full px-3 bg-[#0f0f10] rounded-md w-full">
      <div className="px-5 pt-5">
        <h5 className="text-2xl font-bold">Friends</h5>
      </div>
      {loading ? (
        <p className="flex justify-center items-center p-5"><LoadingIcon /></p>
      ) : (
        <div>
          {listFriends.length > 0 ? (
            <ListFriends listFriends={listFriends} onRemoveFriend={onRemoveFriend} />
          ) : (
            <p className="p-5 text-center text-2xl">Chưa có người bạn nào</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Friend;
