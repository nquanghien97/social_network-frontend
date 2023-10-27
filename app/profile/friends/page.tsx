'use client';

import { useEffect, useState } from 'react';
import { getAllFriends } from '@/services/friend.services';
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

  return (
    <div className="lg:container mx-auto h-full px-3 bg-[#0f0f10] rounded-md w-full">
      <div>
        <h5>Friends</h5>
      </div>
      <ListFriends listFriends={listFriends} />
    </div>
  );
}

export default Friend;
