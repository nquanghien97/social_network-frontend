import Image from 'next/image';
import React from 'react';

interface Friend {
  id: number;
  fullName: string;
  email: string;
}

interface ListFriendsProps {
  listFriends: Friend[];
}

function ListFriends(props: ListFriendsProps) {
  const { listFriends } = props;
  console.log(listFriends);
  return (
    <div>
      {listFriends.map((friend: Friend) => (
        <div className="flex">
          <div>
            {friend.id}
          </div>
          <div>
            {friend.fullName}
          </div>
          <div>
            {friend.email}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListFriends;
