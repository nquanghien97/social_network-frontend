import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../../_assets/logo.png'
import MenuDropdown from '../MenuDropdown/MenuDropdown';
import { listMenuAccount, listMenuPage } from '@/app/_config/listMenuDropdown';
import SearchIcon from '@/app/_assets/icons/SearchIcon';
import DefaultAvatar from '@/app/_assets/DefaultAvatar.svg';
import CloseIcon from '@/app/_assets/icons/CloseIcon';
import MenuIcon from '@/app/_assets/icons/MenuIcon';
import clsx from 'clsx';

function AppHeader() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleClickMenu = () => {
    setIsOpenMenu(!isOpenMenu)
  }
  const isOpenClass = isOpenMenu ? 'flex' : 'max-md:hidden'
  const menuClass = clsx("flex grow items-center max-md:absolute max-md:left-0 max-md:top-14 justify-center max-md:items-start bg-[#0f0f10] w-full max-md:flex-col", isOpenClass)

  return (
    <header className="fixed inset-0 h-14 bg-[#0f0f10] z-[10]">
      <div className="xl:container mx-auto flex justify-between items-center h-full px-3">
        <Link href="/">
          <Image src={logo} alt="logo" width={60} height={60} />
        </Link>
        <div className="md:hidden flex items-center justify-center ml-auto cursor-pointer rounded-md hover:bg-[#ccc] w-10 h-10 bg-[#202227] relative" onClick={toggleClickMenu}>
          {isOpenMenu ? <CloseIcon /> : <MenuIcon />}
        </div>
        <div className={menuClass}>
          <div className="w-full">
            <div className="relative max-md:px-4">
              <button className="cursor-pointer px-2 max-md:px-6 absolute top-1/2 left-0 -translate-y-1/2">
                <SearchIcon color="#8a909b" />
              </button>
              <input
                className="pl-12 px-4 py-2 bg-[#202227] outline-0 border border-[#313235] rounded-md w-full"
                placeholder='Search...'
              />
            </div>
          </div>
          <div className="flex md:ml-auto max-md:flex-col max-md:w-full">
            <MenuDropdown
              listMenu={listMenuPage}
              title="Page"
            />
            <MenuDropdown
              listMenu={listMenuAccount}
              title="Account"
            />
          </div>
        </div>
        <div className="w-10 h-10 cursor-pointer ml-4">
          <Image
            src={DefaultAvatar}
            alt="Default Avatar" 
            className="w-full h-full rounded-md"
          />
        </div>
      </div>
    </header>
  )
}

export default AppHeader