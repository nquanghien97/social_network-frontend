'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUserId } from '@/services/user.services';
import { AppSidebar } from '../_components/AppSidebar';
import MessageSidebarItem from '../_components/common/Message/MessageSidebarItem';
import { useFriends } from '@/zustand/friends.store';
import MessageIcon from '../_assets/icons/MessageIcon';
import { listUserIdOfConversation } from '@/services/message.services';
import { useMessageStore } from '@/zustand/message.store';

export default function Layout() {
  const { getListFriends, listFriends, loadingFriends } = useFriends();
  const { id } = useParams();
  const userId = getUserId();
  const [openMessage, setOpenMessage] = useState(false);
  const { setReceiverId, receiverId } = useMessageStore();

  useEffect(() => {
    getListFriends(userId);
  }, []);
  useEffect(() => {
    if (id) {
      (async () => {
        const res = await listUserIdOfConversation(id as string);
        setReceiverId(res.data[0].userId);
      })();
    }
    return () => {
      setReceiverId('');
    };
  }, [id]);

  return (
    <>
      <div className="flex items-center gap-2 lg:hidden cursor-pointer mb-2" onClick={() => setOpenMessage(true)} aria-hidden="true">
        <MessageIcon
          fill="#0f6fec"
          width={40}
          height={40}
        />
        <p>Chat</p>
      </div>
      <div className="lg:hidden block bg-[#0f0f10]">
        <AppSidebar
          open={openMessage}
          setOpen={setOpenMessage}
          start="-24rem"
          end="0"
          exit="-24rem"
        >
          <div className="p-5 min-w-[300px] border-r-0 border-0 lg:border-r-2 border-[#202227]">
            <MessageSidebarItem setOpen={setOpenMessage} listFriends={listFriends} loadingFriends={loadingFriends} receiverId={receiverId} />
          </div>
        </AppSidebar>
      </div>
      <div className="p-5 min-w-[300px] border-0 border-r-2 border-[#202227] bg-[#0f0f10] rounded-md hidden lg:block">
        <MessageSidebarItem setOpen={setOpenMessage} listFriends={listFriends} loadingFriends={loadingFriends} closeMessageIcon={false} receiverId={receiverId} />
      </div>
    </>
  );
}
