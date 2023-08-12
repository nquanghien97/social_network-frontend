"use client"

import { useState } from 'react';
import AppSidebar from './_components/AppSidebar/AppSidebar'
import AppSidebarItem from './_components/AppSidebarItem/AppSidebarItem'
import HomePage from './_components/HomePage';
import AppHeader from './_components/AppHeader/AppHeader';

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AppHeader />
      <main className="xl:container mx-auto">
        <HomePage />
        <div className="block max-md:hidden">
          <button onClick={() => setOpen(true)}>open sidebar</button>
        </div>
        <AppSidebar
          open={open}
          setOpen={setOpen}
          start= '100vw'
          end='calc(100vw - 24rem)'
          exit='100vw'
        >
          <h3>sidebar</h3>
        </AppSidebar>
      </main>
    </>
  )
}
