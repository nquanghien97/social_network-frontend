import React, { Dispatch, SetStateAction } from 'react';
import CloseIcon from '../../../_assets/icons/CloseIcon';

interface MessageSidebarItemProps {
  setOpen: Dispatch<SetStateAction<boolean>>
}

function MessageSidebarItem(props: MessageSidebarItemProps) {
  const { setOpen } = props;
  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <h2>Messaging</h2>
        <div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#0f6fec1a] hover:bg-[#a1a1a7] hover:text-[#0f6fec] duration-300 cursor-pointer"
            onClick={() => setOpen(false)}
            aria-hidden
          >
            <CloseIcon className="fill-current" />
          </div>
        </div>
      </div>
      <div>
        <div>Search</div>
        <div>
          message item
        </div>
      </div>
    </div>
  );
}

export default MessageSidebarItem;
