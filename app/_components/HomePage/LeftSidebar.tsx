import Image from 'next/image';
import { toast } from 'react-toastify';
import { useAuth } from '@/zustand/auth.store';
import HomeIcon from '../../_assets/icons/HomeIcon';
import SettingsIcon from '../../_assets/icons/SettingsIcon';
import FriendsIcon from '../../_assets/icons/FriendsIcon';
import NewsIcon from '../../_assets/icons/NewsIcon';
import GroupIcon from '../../_assets/icons/GroupIcon';
import Notifications from '../../_assets/icons/Notifications';
import NavLink from '../common/NavLink';

export function LeftSidebarItem() {
  const { user } = useAuth();

  const toastUnDeveloped = () => {
    toast.info('Tính năng chưa được phát triển');
  };
  return (
    <div className="lg:mt-4">
      <div className="bg-[#0f0f10] border border-[#0f0f10] rounded-md">
        <div className="p-5">
          <div>
            <div className="text-center">
              <div className="h-16 w-16 m-auto mb-4">
                <Image src={user.imageUrl || '/DefaultAvatar.svg'} width={100} height={100} alt="Default Avatar" unoptimized className="w-full h-full rounded-md" />
              </div>
              <h5 className="text-xl">{user.fullName}</h5>
              <small className="text-sm text-[#ccc]">{user.job}</small>
              <p className="my-4 text-[#ccc] text-sm">{user.description}</p>
            </div>
            <hr className="my-4" />
            <ul>
              <li>
                <NavLink className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer flex items-center" href={`/${user.id}`}>
                  <HomeIcon className="fill-current pr-1" />
                  Feed
                </NavLink>
              </li>
              <li>
                <NavLink className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer flex items-center" href={`/${user.id}/friends`}>
                  <FriendsIcon className="fill-current pr-1" />
                  Connections
                </NavLink>
              </li>
              <li className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer flex items-center" onClick={toastUnDeveloped} aria-hidden>
                <NewsIcon className="fill-current pr-1" />
                Latest News
              </li>
              <li className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer flex items-center" onClick={toastUnDeveloped} aria-hidden>
                <NewsIcon className="fill-current pr-1" />
                Events
              </li>
              <li className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer flex items-center" onClick={toastUnDeveloped} aria-hidden>
                <GroupIcon className="fill-current pr-1" />
                Groups
              </li>
              <li className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer flex items-center" onClick={toastUnDeveloped} aria-hidden>
                <Notifications className="fill-current pr-1" />
                Notifications
              </li>
              <li>
                <NavLink className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer flex items-center" href="/settings">
                  <SettingsIcon className="fill-current pr-1" />
                  Settings
                </NavLink>
              </li>
            </ul>
          </div>
          <hr className="my-4" />
          <div className="flex justify-center">
            <NavLink href={`/${user.id}`} className="py-2 px-5 text-center text-[#0f6fec] hover:text-[#0c59bd] cursor-pointer">
              View Profile
            </NavLink>
          </div>
        </div>
      </div>
      <ul className="mt-6 flex flex-wrap justify-center">
        <li className="py-1 px-3 hover:text-[#0f6fec] cursor-pointer">About</li>
        <li className="py-1 px-3 hover:text-[#0f6fec] cursor-pointer">Settings</li>
        <li className="py-1 px-3 hover:text-[#0f6fec] cursor-pointer">Support</li>
        <li className="py-1 px-3 hover:text-[#0f6fec] cursor-pointer">Docs</li>
        <li className="py-1 px-3 hover:text-[#0f6fec] cursor-pointer">Help</li>
        <li className="py-1 px-3 hover:text-[#0f6fec] cursor-pointer">Privacy & terms</li>
      </ul>
    </div>
  );
}
function LeftSidebar() {
  return (
    <div className="w-1/4 max-h-0 sticky top-14 lg:block hidden min-h-content px-3">
      <LeftSidebarItem />
    </div>
  );
}

export default LeftSidebar;
