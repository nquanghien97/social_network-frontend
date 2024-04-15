'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import logo from '../../_assets/logo.png';
import MenuDropdown from '../MenuDropdown/MenuDropdown';
import SearchIcon from '../../_assets/icons/SearchIcon';
import CloseIcon from '../../_assets/icons/CloseIcon';
import MenuIcon from '../../_assets/icons/MenuIcon';
import BookMarks from '../../_assets/icons/BookMarks';
import MessageIcon from '../../_assets/icons/MessageIcon';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { logOut } from '../../../services/auth.services';
import { searchUsers } from '@/services/user.services';
import UserEntity from '@/entities/User.entities';
import BaseInput from '../common/BaseInput';
import { useNewFeed } from '@/zustand/newfeed.store';
import { useAuth } from '@/zustand/auth.store';
import SettingsIcon from '../../_assets/icons/SettingsIcon';
import PrivacyIcon from '../../_assets/icons/PrivacyIcon';
import LogoutIcon from '../../_assets/icons/LogoutIcon';
import ProfileIcon from '../../_assets/icons/ProfileIcon';
import ImagesIcon from '../../_assets/icons/ImagesIcon';
import NewsIcon from '../../_assets/icons/NewsIcon';

function AppHeader() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModalProfile, setIsOpenModalProfile] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [resultSearch, setResultSearch] = useState<UserEntity[]>([]);
  const { user } = useAuth();
  const { getNewFeed } = useNewFeed();
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

  const onClickLogo = async () => {
    router.push('/');
    await getNewFeed({ offset: 1, limit: 2 });
  };

  const toastUnDeveloped = () => {
    toast.info('Tính năng chưa được phát triển');
  };

  const signOut = () => {
    logOut();
    router.push('/sign-in');
  };

  useEffect(() => {
    (async () => {
      if (searchText) {
        const res = await searchUsers(searchText);
        setResultSearch(res.users);
      }
    })();
  }, [searchText]);

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
            <Link href={`/${user.id}`} scroll={false}>{user.fullName}</Link>
            {user.job && (
              <p className="text-sm font-normal text-[#a1a1a8]">{user.job}</p>
            )}
          </div>
        </div>
        <div className="mt-4 flex">
          <Link href={`/${user.id}`} scroll={false} className="text-center px-3 py-2 rounded bg-[#0f6fec1a] hover:bg-[#326de4] duration-300 w-full">View Profile</Link>
        </div>
        <div className="py-2 flex flex-col" aria-hidden="true">
          <Link className="hover:text-[#0f6fec] duration-300 cursor-pointer p-1 flex items-center" href="/settings">
            <SettingsIcon className="fill-current pr-1" color="white" />
            <span>Settings</span>
          </Link>
          <Link className="hover:text-[#0f6fec] duration-300 cursor-pointer p-1 flex items-center" href="/">
            <PrivacyIcon className="fill-current pr-1" color="white" />
            <span>Privacy & Term</span>
          </Link>
        </div>
      </div>
      <hr className="mb-4" />
      <div className="p-1 hover:text-[#0f6fec] duration-300 cursor-pointer flex items-center" onClick={signOut} aria-hidden="true">
        <LogoutIcon className="fill-current pr-1" color="white" />
        <span>Sign out</span>
      </div>
    </div>
  );

  return (
    <>
      <div />
      <div className="fixed inset-0 h-14 bg-[#0f0f10] z-[20] shadow-[0_2px_4px_-1px_rgba(255,255,255,0.3)]">
        <div className="xl:container mx-auto flex justify-between items-center h-full px-3">
          <div aria-hidden="true" onClick={onClickLogo} className="cursor-pointer">
            <Image src={logo} alt="logo" width={60} height={60} unoptimized />
          </div>
          <div className="lg:hidden relative flex gap-x-2 ml-auto">
            <div aria-hidden="true" className="flex items-center justify-center cursor-pointer rounded-lg hover:bg-[white] text-[#0f6fec] w-10 h-10 bg-[#202227]" onClick={toggleClickMenu}>
              {isOpenMenu ? <CloseIcon color="#0f6fec" /> : <MenuIcon fill="#0f6fec" />}
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
                  <ul className="bg-[#0f0f10] absolute z-10 w-full flex flex-col min-w-[15rem] border border-[#ffffff12] rounded-md py-4">
                    {resultSearch.length > 0 ? resultSearch.map((item) => (
                      <li
                        key={item.id}
                        aria-hidden
                        onClick={() => router.push(`/${item.id}`)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-[#ffffff1a] hover:text-[#0f6fec] px-4 py-2 w-full duration-300"
                      >
                        <Image
                          width={40}
                          height={40}
                          src={item.imageUrl || '/DefaultAvatar.svg'}
                          alt={item.fullName || ''}
                          className="rounded"
                        />
                        <p>{item.fullName}</p>
                      </li>
                    )) : (
                      <p className="px-4 py-2">Không có người dùng phù hợp</p>
                    )}
                  </ul>
                ) : null}
              </div>
            </div>
            <div className="flex lg:ml-auto max-lg:flex-col max-lg:w-full">
              <MenuDropdown
                title="Page"
              >
                <ul className="bg-[#0f0f10] flex flex-col min-w-[15rem] border border-[#ffffff12] rounded-md lg:py-4">
                  <li>
                    <Link className="cursor-pointer hover:text-[#0f6fec] px-4 py-2 w-full flex items-center" href={`/${user.id}/photos`}>
                      <ImagesIcon className="fill-current pr-1" />
                      Photos
                    </Link>
                  </li>
                  <li className="cursor-pointer hover:text-[#0f6fec] px-4 py-2 w-full flex items-center" onClick={toastUnDeveloped} aria-hidden>
                    <MessageIcon className="fill-current pr-1" />
                    Messages
                  </li>
                  <li
                    className="cursor-pointer hover:text-[#0f6fec] px-4 py-2 w-full flex items-center"
                    onClick={() => router.push(`/${user.id}`)}
                    aria-hidden
                  >
                    <ProfileIcon className="fill-current pr-1" />
                    Profile
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
                    <Link className="cursor-pointer hover:text-[#0f6fec] px-4 py-2 w-full flex items-center" href="/settings">
                      <SettingsIcon className="fill-current pr-1" />
                      Settings
                    </Link>
                  </li>
                  <li className="cursor-pointer hover:text-[#0f6fec] px-4 py-2 w-full flex items-center" onClick={toastUnDeveloped} aria-hidden>
                    <PrivacyIcon className="fill-current pr-1" />
                    Privacy & terms
                  </li>
                  <li
                    className="cursor-pointer hover:text-[#0f6fec] px-4 py-2 w-full flex items-center"
                    onClick={signOut}
                    aria-hidden
                  >
                    <LogoutIcon className="fill-current pr-1" />
                    Sign Out
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
            />
            { isOpenModalProfile && modalProfile()}
          </div>
        </div>
      </div>
    </>
  );
}

export default AppHeader;
