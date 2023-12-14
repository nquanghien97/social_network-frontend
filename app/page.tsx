'use client';

import { useState } from 'react';
import AppSidebar from './_components/AppSidebar/AppSidebar';
import HomePage from './_components/HomePage';
import AppHeader from './_components/AppHeader/AppHeader';
import MessageIcon from './_assets/icons/MessageIcon';
import withAuthetication from '../hocs/withAuthentication';

function Home() {
  const [openMessage, setOpenMessage] = useState(false);
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
        end="calc(100vw - 24rem)"
        exit="100vw"
      >
        <h3>Message</h3>
      </AppSidebar>
    </div>
  );
}

export default withAuthetication(Home);
