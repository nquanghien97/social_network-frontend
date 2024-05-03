import React, { Dispatch, SetStateAction } from 'react';
import CloseIcon from '../../../../_assets/icons/CloseIcon';
import ListFriendsMessage from './ListFriendsMessage';
import UserEntity from '@/entities/User.entities';
import BaseInput from '../../BaseInput';

interface MessageSidebarItemProps {
  setOpen: Dispatch<SetStateAction<boolean>>
  loadingFriends: boolean;
  listFriends: UserEntity[];
  closeMessageIcon?: boolean;
}

function MessageSidebarItem(props: MessageSidebarItemProps) {
  const {
    setOpen,
    loadingFriends,
    listFriends,
    closeMessageIcon = true,
  } = props;
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2>Message</h2>
        {closeMessageIcon ? (
          <div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#0f6fec1a] hover:bg-[#a1a1a7] hover:text-[#0f6fec] duration-300 cursor-pointer"
              onClick={() => setOpen(false)}
              aria-hidden
            >
              <CloseIcon className="fill-current" />
            </div>
          </div>
        ) : null}
      </div>
      <div>
        <div className="py-4">
          <BaseInput placeholder="Search.." />
        </div>
        <div>
          <ListFriendsMessage loadingFriends={loadingFriends} listFriends={listFriends} setOpenMessage={setOpen} />
        </div>
      </div>
    </div>
  );
}

export default MessageSidebarItem;
