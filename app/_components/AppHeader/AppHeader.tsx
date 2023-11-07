'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import logo from '../../_assets/logo.png';
import MenuDropdown from '../MenuDropdown/MenuDropdown';
import { listMenuAccount, listMenuPage } from '../../_config/listMenuDropdown';
import SearchIcon from '../../_assets/icons/SearchIcon';
import CloseIcon from '../../_assets/icons/CloseIcon';
import MenuIcon from '../../_assets/icons/MenuIcon';
import BookMarks from '../../_assets/icons/BookMarks';
import MessageIcon from '../../_assets/icons/MessageIcon';
import { useOutsideClick } from '../../_hooks/useOutsideClick';
import { logOut } from '../../../services/auth.services';
import { AppDispatch, RootState } from '../../../store';
import { getNewFeedAsync } from '../../../store/reducers/newFeedReducer';

function AppHeader() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModalProfile, setIsOpenModalProfile] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.profile);

  const router = useRouter();

  const toggleClickMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  const isOpenClass = isOpenMenu ? 'flex' : 'max-lg:hidden';
  const menuClass = clsx(
    'max-lg:shadow-[0_2px_4px_-1px_rgba(255,255,255,0.3)] flex grow items-center max-lg:absolute max-lg:left-0',
    'max-lg:top-14 justify-center max-lg:items-start bg-[#0f0f10] w-full max-lg:flex-col',
    isOpenClass,
  );

  const profileModalRef = useOutsideClick(() => {
    setIsOpenModalProfile(false);
  });

  const fetchPosts = () => {
    dispatch(getNewFeedAsync());
    router.push('/', { scroll: false });
  };

  const signOut = () => {
    logOut();
    router.push('/sign-in');
  };

  const modalProfile = () => (
    <div ref={profileModalRef} className="absolute right-0 p-4 bg-[#0f0f10] rounded-md border border-[#ffffff12] min-w-[280px]">
      <div>
        <div className="flex justify-center">
          <div className="w-12 h-12 mr-4">
            <Image
              src={profile.imageUrl}
              width={100}
              height={100}
              alt="Default Avatar"
              className="w-full h-full rounded-full"
              unoptimized
            />
          </div>
          <div>
            <Link href="/profile" scroll={false}>{profile.fullName}</Link>
            <p className="text-sm font-normal text-[#a1a1a8]">{profile.job}</p>
          </div>
        </div>
        <div className="mt-4 flex">
          <Link href="/profile" scroll={false} className="text-center px-3 py-2 rounded bg-[#0f6fec1a] hover:bg-[#326de4] duration-300 w-full">View Profile</Link>
        </div>
      </div>
      <hr className="my-4" />
      <div className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer text-center" onClick={signOut} aria-hidden="true">
        Signout
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 h-14 bg-[#0f0f10] z-[10] shadow-[0_2px_4px_-1px_rgba(255,255,255,0.3)]">
      <div className="xl:container mx-auto flex justify-between items-center h-full px-3">
        <div aria-hidden="true" onClick={fetchPosts} className="cursor-pointer">
          <Image src={logo} alt="logo" width={60} height={60} unoptimized />
        </div>
        <div className="lg:hidden relative flex gap-x-2 ml-auto">
          <div aria-hidden="true" className="flex items-center justify-center cursor-pointer rounded-lg hover:bg-[white] text-[#0f6fec] w-10 h-10 bg-[#202227]" onClick={toggleClickMenu}>
            {isOpenMenu ? <CloseIcon fill="#0f6fec" /> : <MenuIcon fill="#0f6fec" />}
          </div>
          <Link
            className="flex items-center justify-center cursor-pointer rounded-lg hover:bg-[white] w-10 h-10 bg-[#202227]"
            href="/bookmarks"
          >
            <BookMarks fill="#0f6fec" />
          </Link>
          <div className="flex items-center justify-center cursor-pointer rounded-lg hover:bg-[white] w-10 h-10 bg-[#202227]">
            <MessageIcon
              fill="#0f6fec"
            />
          </div>
        </div>
        <div className={menuClass}>
          <div className="w-full">
            <div className="relative max-lg:px-4">
              <button type="button" className="cursor-pointer px-2 max-lg:px-6 absolute top-1/2 left-0 -translate-y-1/2">
                <SearchIcon color="#8a909b" />
              </button>
              <input
                className="pl-12 px-4 py-2 bg-[#202227] outline-0 border border-[#313235] rounded-lg w-full"
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="flex lg:ml-auto max-lg:flex-col max-lg:w-full">
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
        <div aria-hidden="true" className="w-10 h-10 cursor-pointer ml-4 relative" onClick={() => setIsOpenModalProfile(!isOpenModalProfile)}>
          {profile.imageUrl && (
            <Image
              src={profile.imageUrl}
              width={100}
              height={100}
              alt="Avatar"
              className="w-full h-full rounded-lg"
              unoptimized
            />
          )}
          { isOpenModalProfile && modalProfile()}
        </div>
      </div>
    </div>
  );
}

export default AppHeader;
