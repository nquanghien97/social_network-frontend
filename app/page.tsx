'use client';

import { useEffect, useState } from 'react';
import AppSidebar from '@/components/AppSidebar/AppSidebar';
import HomePage from '@/components/HomePage';
import AppHeader from '@/components/AppHeader/AppHeader';
import MessageSidebarItem from '@/components/common/Message/MessageSidebarItem';
import MessageIcon from '@/assets/icons/MessageIcon';
import withAuthetication from '@/hocs/withAuthentication';
import { getUser, getUserId } from '@/services/user.services';
import { useFriends } from '@/zustand/friends.store';
import { useAuth } from '@/zustand/auth.store';
import { isAuthenticated } from '@/utils/isAuthenticated';

function Home() {
  const userId = getUserId();
  const { getListFriends, listFriends, loadingFriends } = useFriends();
  const [openMessage, setOpenMessage] = useState(false);
  const { setProfile } = useAuth();
  useEffect(() => {
    getListFriends(userId);
    (async () => {
      if (isAuthenticated()) {
        const res = await getUser();
        setProfile(res);
      }
    })();
  }, []);
  return (
    <div className="scroll-smooth">
      <AppHeader />
      <main className="xl:container mx-auto">
        <HomePage />
      </main>
      <div className="block max-lg:hidden fixed right-4 bottom-4 cursor-pointer" onClick={() => setOpenMessage(true)} aria-hidden="true">
        <MessageIcon
          fill="#0f6fec"
          width={40}
          height={40}
        />
      </div>
      <AppSidebar
        open={openMessage}
        setOpen={setOpenMessage}
        start="100vw"
        end="calc(100vw - 25rem)"
        exit="100vw"
      >
        <MessageSidebarItem setOpen={setOpenMessage} listFriends={listFriends} loadingFriends={loadingFriends} />
      </AppSidebar>
    </div>
  );
}

export default withAuthetication(Home);
