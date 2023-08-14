"use client"

import { useState } from 'react';
import AppSidebar from './_components/AppSidebar/AppSidebar'
import AppSidebarItem from './_components/AppSidebarItem/AppSidebarItem'
import HomePage from './_components/HomePage';
import AppHeader from './_components/AppHeader/AppHeader';
import MessageIcon from './_assets/icons/MessageIcon';

export default function Home() {
  const [openMessage, setOpenMessage] = useState(false);
  return (
    <>
      <AppHeader />
      <main className="xl:container mx-auto">
        <HomePage />
      </main>
      <div className="block max-lg:hidden fixed right-4 bottom-4 cursor-pointer" onClick={() => setOpenMessage(true)}>
        <MessageIcon />
      </div>
      <AppSidebar
        open={openMessage}
        setOpen={setOpenMessage}
        start= '100vw'
        end='calc(100vw - 24rem)'
        exit='100vw'
      >
        <h3>Message</h3>
      </AppSidebar>
    </>
  )
}
