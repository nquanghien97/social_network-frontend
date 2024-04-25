'use client';

import { useEffect, useState } from 'react';
import { AppHeader } from '../_components/AppHeader';
import { getUserId } from '@/services/user.services';
import UserEntity from '@/entities/User.entities';
import { getAllFriends } from '@/services/friend.services';
import MessageIcon from '../_assets/icons/MessageIcon';
import { AppSidebar } from '../_components/AppSidebar';
import ListFriendsMessage from '../_components/common/MessageSidebarItem/ListFriendsMessage';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userId = getUserId();
  const [listFriends, setListFriends] = useState<UserEntity[]>([]);
  const [loadingFriends, setLoadingFriends] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  useEffect(() => {
    setLoadingFriends(true);
    (async () => {
      try {
        const res = await getAllFriends(userId);
        setListFriends(res.listFriends);
        setLoadingFriends(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <AppHeader />
      <div className="pt-20 pb-6 px-6 h-screen">
        <div className="flex items-center gap-2 lg:hidden cursor-pointer mb-2" onClick={() => setOpenMessage(true)} aria-hidden="true">
          <MessageIcon
            fill="#0f6fec"
            width={40}
            height={40}
          />
          <p>Chat</p>
        </div>
        <div className="bg-[#0f0f10] border border-[#0f0f10] rounded-md flex flex-col lg:flex-row h-full">
          <div className="lg:hidden block">
            <AppSidebar
              open={openMessage}
              setOpen={setOpenMessage}
              start="-24rem"
              end="0"
              exit="-24rem"
            >
              <div className="p-5 min-w-[300px] border-0 border-r-2 border-[#202227] block lg:hidden">
                <ListFriendsMessage listFriends={listFriends} loadingFriends={loadingFriends} />
              </div>
            </AppSidebar>
          </div>
          <div className="p-5 min-w-[300px] border-0 border-r-2 border-[#202227] hidden lg:block">
            <ListFriendsMessage listFriends={listFriends} loadingFriends={loadingFriends} />
          </div>
          <div className="lg:py-5 px-5 w-full h-full flex items-center justify-center">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
