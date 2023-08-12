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
        {/* <button onClick={() => setOpen(true)}>open sidebar</button>
        <AppSidebar open={open} onClose={() => setOpen(false)}>
          <h3>sidebar</h3>
        </AppSidebar> */}
      </main>
    </>
  )
}
