'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { getUser } from '@/services/user.services';
import { isAuthenticated } from '@/utils/isAuthenticated';
import useDebounce from '@/hooks/useDebounce';
import SettingsIcon from '@/assets/icons/SettingsIcon';
import PrivacyIcon from '@/assets/icons/PrivacyIcon';
import LogoutIcon from '@/assets/icons/LogoutIcon';
import ProfileIcon from '@/assets/icons/ProfileIcon';
import ImagesIcon from '@/assets/icons/ImagesIcon';
import NewsIcon from '@/assets/icons/NewsIcon';
import { useNewFeed } from '@/zustand/newfeed.store';
import { useAuth } from '@/zustand/auth.store';
import SearchIcon from '@/assets/icons/SearchIcon';
import CloseIcon from '@/assets/icons/CloseIcon';
import MenuIcon from '@/assets/icons/MenuIcon';
import BookMarks from '@/assets/icons/BookMarks';
import MessageIcon from '@/assets/icons/MessageIcon';
import { logOut } from '@/services/auth.services';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import logo from '@/assets/logo.png';
import MenuDropdown from '@/components/MenuDropdown/MenuDropdown';
import BaseInput from '@/components/common/BaseInput';
import NavLink from '@/components/common/NavLink';
import ResultSearch from '@/components/common/SearchResult';

function AppHeader() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModalProfile, setIsOpenModalProfile] = useState(false);
  const [searchText, setSearchText] = useState('');
  const debounceSearchText = useDebounce(searchText, 500);
  const { user } = useAuth();
  const { getNewFeed } = useNewFeed();

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

  const modalSearchResults = useOutsideClick(() => {
    setSearchText('');
  });

  const onClickLogo = async () => {
    await getNewFeed({ offset: 1, limit: 2 });
  };

  const toastUnDeveloped = () => {
    toast.info('Tính năng chưa được phát triển');
  };

  const { setProfile } = useAuth();
  useEffect(() => {
    (async () => {
      if (isAuthenticated()) {
        const res = await getUser();
        setProfile(res);
      }
    })();
  }, []);

  const signOut = () => {
    logOut();
  };

  const modalProfile = () => (
    <div ref={profileModalRef} className="absolute right-0 p-4 bg-[#0f0f10] rounded-md border border-[#ffffff12] min-w-[280px]">
      <div>
        <div className="flex justify-center">
          <div className="w-12 h-12 mr-4">
            <Image
              src={user.imageUrl || '/DefaultAvatar.svg'}
              width={100}
              height={100}
              alt="Default Avatar"
              className="w-full h-full rounded-full"
              unoptimized
            />
          </div>
          <div className="flex items-center flex-col">
            <NavLink href={`/${user.id}`}>{user.fullName}</NavLink>
            {user.job && (
              <p className="text-sm font-normal text-[#a1a1a8]">{user.job}</p>
            )}
          </div>
        </div>
        <div className="mt-4 flex">
          <NavLink href={`/${user.id}`} className="text-center px-3 py-2 rounded bg-[#0f6fec1a] hover:bg-[#326de4] duration-300 w-full">View Profile</NavLink>
        </div>
        <div className="py-2 flex flex-col" aria-hidden="true">
          <NavLink className="hover:text-[#0f6fec] duration-300 cursor-pointer p-1 flex items-center" href="/settings">
            <SettingsIcon className="fill-current pr-1" color="white" />
            <span>Settings</span>
          </NavLink>
          <div className="hover:text-[#0f6fec] duration-300 cursor-pointer p-1 flex items-center" onClick={toastUnDeveloped} aria-hidden>
            <PrivacyIcon className="fill-current pr-1" color="white" />
            <span>Privacy & Term</span>
          </div>
        </div>
      </div>
      <hr className="mb-4" />
      <div onClick={signOut} aria-hidden="true">
        <NavLink className="hover:text-[#0f6fec] duration-300 cursor-pointer p-1 flex items-center" href="/sign-in">
          <LogoutIcon className="fill-current pr-1" color="white" />
          <span>Sign out</span>
        </NavLink>
      </div>
    </div>
  );

  return (
    <>
      <div />
      <div className="fixed inset-0 h-14 bg-[#0f0f10] z-[20] shadow-[0_2px_4px_-1px_rgba(255,255,255,0.3)]">
        <div className="xl:container mx-auto flex justify-between items-center h-full px-3">
          <NavLink href="/" onClick={onClickLogo} className="cursor-pointer w-[60px] h-[40px]">
            <Image src={logo} alt="logo" width={60} height={60} unoptimized priority />
          </NavLink>
          <div className="lg:hidden relative flex gap-x-2 ml-auto">
            <div aria-hidden="true" className="flex items-center justify-center cursor-pointer rounded-lg hover:bg-[white] text-[#0f6fec] w-10 h-10 bg-[#202227]" onClick={toggleClickMenu}>
              {isOpenMenu ? <CloseIcon color="#0f6fec" /> : <MenuIcon fill="#0f6fec" />}
            </div>
            <NavLink
              className="flex items-center justify-center cursor-pointer rounded-lg hover:bg-[white] w-10 h-10 bg-[#202227]"
              href="/bookmarks"
            >
              <BookMarks fill="#0f6fec" />
            </NavLink>
            <NavLink
              className="flex items-center justify-center cursor-pointer rounded-lg hover:bg-[white] w-10 h-10 bg-[#202227]"
              href="/message"
            >
              <MessageIcon
                fill="#0f6fec"
              />
            </NavLink>
          </div>
          <div className={menuClass}>
            <div className="w-full">
              <div className="relative max-lg:px-4">
                <BaseInput
                  className="pl-12 px-4 py-2 bg-[#202227] outline-0 border border-[#313235] rounded-lg w-full"
                  placeholder="Search..."
                  onChange={(e) => setSearchText(e.target.value)}
                  startIcon={<SearchIcon color="#8a909b" />}
                  value={searchText}
                  endIcon={searchText ? (
                    <div className="p-1 rounded-full hover:bg-[#ffffff1a] hover:text-[black] duration-300">
                      <CloseIcon onClick={() => setSearchText('')} color="#8a909b" />
                    </div>
                  )
                    : null}
                />
                {searchText ? (
                  <ResultSearch ref={modalSearchResults} searchText={debounceSearchText} />
                ) : null}
              </div>
            </div>
            <div className="flex lg:ml-auto max-lg:flex-col max-lg:w-full">
              <MenuDropdown
                title="Page"
              >
                <ul className="bg-[#0f0f10] flex flex-col min-w-[15rem] border border-[#ffffff12] rounded-md lg:py-4">
                  <li>
                    <NavLink className="cursor-pointer hover:text-[#0f6fec] px-4 py-2 w-full flex items-center" href={`/${user.id}/photos`}>
                      <ImagesIcon className="fill-current pr-1" />
                      Photos
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="cursor-pointer hover:text-[#0f6fec] px-4 py-2 w-full flex items-center" href="/message">
                      <MessageIcon className="fill-current pr-1" />
                      Messages
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="cursor-pointer hover:text-[#0f6fec] px-4 py-2 w-full flex items-center" href={`/${user.id}`}>
                      <ProfileIcon className="fill-current pr-1" />
                      Profile
                    </NavLink>
                  </li>
                  <li className="cursor-pointer hover:text-[#0f6fec] px-4 py-2 w-full flex items-center" onClick={toastUnDeveloped} aria-hidden>
                    <NewsIcon className="fill-current pr-1" />
                    Today News
                  </li>
                </ul>
              </MenuDropdown>
              <MenuDropdown
                title="Account"
              >
                <ul className="bg-[#0f0f10] flex flex-col min-w-[15rem] border border-[#ffffff12] rounded-md py-4">
                  <li>
                    <NavLink className="cursor-pointer hover:text-[#0f6fec] px-4 py-2 w-full flex items-center" href="/settings">
                      <SettingsIcon className="fill-current pr-1" />
                      Settings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="cursor-pointer hover:text-[#0f6fec] px-4 py-2 w-full flex items-center" href="/privacy-terms">
                      <PrivacyIcon className="fill-current pr-1" />
                      Privacy & terms
                    </NavLink>
                  </li>
                  <li onClick={signOut} aria-hidden>
                    <NavLink className="cursor-pointer hover:text-[#0f6fec] px-4 py-2 w-full flex items-center" href="/sign-in">
                      <LogoutIcon className="fill-current pr-1" />
                      Sign Out
                    </NavLink>
                  </li>
                </ul>
              </MenuDropdown>
            </div>
          </div>
          <div aria-hidden="true" className="w-10 h-10 cursor-pointer ml-4 relative" onClick={() => setIsOpenModalProfile(!isOpenModalProfile)}>
            <Image
              src={user.imageUrl || '/DefaultAvatar.svg'}
              width={100}
              height={100}
              alt="Avatar"
              className="w-full h-full rounded-lg"
              unoptimized
              priority
            />
            { isOpenModalProfile && modalProfile()}
          </div>
        </div>
      </div>
    </>
  );
}

export default AppHeader;
