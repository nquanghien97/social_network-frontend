import Image from 'next/image';
import React, { useState } from 'react';
import BaseButton from '../../_components/common/BaseButton';
import Modal from '../../_components/common/Modal';

interface Friend {
  id: number;
  fullName: string;
  email: string;
  imageUrl: string;
}

interface ListFriendsProps {
  listFriends: Friend[];
  onRemoveFriend: (idFriend: number) => Promise<void>;
}

function ListFriends(props: ListFriendsProps) {
  const { listFriends, onRemoveFriend } = props;
  const [openModalRemoveFriend, setOpenModalRemoveFriend] = useState(false);
  const [idFriend, setIdFriend] = useState(-1);

  const modalConfirmRemoveFriend = () => (
    <Modal
      open={openModalRemoveFriend}
      onClose={() => setOpenModalRemoveFriend(false)}
    >
      <div className="p-5 bg-[#26262b] rounded-md">
        <p className="mb-4">Do you want to remove this person?</p>
        <div className="flex gap-4">
          <BaseButton
            onClick={() => {
              onRemoveFriend(idFriend);
              setOpenModalRemoveFriend(false);
            }}
          >
            Confirm
          </BaseButton>
          <BaseButton
            className="text-[red] hover:bg-[red] hover:text-[white]"
            onClick={() => setOpenModalRemoveFriend(false)}
          >
            Cancel
          </BaseButton>
        </div>
      </div>
    </Modal>
  );
  return (
    <div className="p-5">
      {listFriends.map((friend: Friend) => (
        <div className="flex mb-8" key={friend.id}>
          <div className="mr-2 w-[48px] h-[48px]">
            <Image
              className="rounded-full w-full h-full"
              src={friend.imageUrl || '/DefaultAvatar.svg'}
              alt="avatar friend"
              width={48}
              height={48}
              unoptimized
            />
          </div>
          <div className="flex flex-col">
            <div>
              {friend.fullName}
            </div>
            <div>
              {friend.email}
            </div>
          </div>
          <div className="flex ml-auto gap-3">
            <BaseButton
              className="text-[red] hover:bg-[red] hover:text-[white]"
              onClick={() => {
                setOpenModalRemoveFriend(true);
                setIdFriend(friend.id);
              }}
            >
              Remove
            </BaseButton>
            <BaseButton>Message</BaseButton>
          </div>
        </div>
      ))}
      {modalConfirmRemoveFriend()}
    </div>
  );
}

export default ListFriends;
