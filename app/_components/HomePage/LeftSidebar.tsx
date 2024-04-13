import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useAuth } from '@/zustand/auth.store';

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
              {/* <div>Thông số</div> */}
            </div>
            <hr className="my-4" />
            <ul>
              <li className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer">
                <Link href={`/${user.id}`}>Feed</Link>
              </li>
              <li className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer">
                <Link href={`/${user.id}/friends`}>Connections</Link>
              </li>
              <li className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer" onClick={toastUnDeveloped} aria-hidden>Latest News</li>
              <li className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer" onClick={toastUnDeveloped} aria-hidden>Events</li>
              <li className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer" onClick={toastUnDeveloped} aria-hidden>Groups</li>
              <li className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer" onClick={toastUnDeveloped} aria-hidden>Notifications</li>
              <li className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer" onClick={toastUnDeveloped} aria-hidden>Settings</li>
            </ul>
          </div>
          <hr className="my-4" />
          <Link scroll={false} aria-hidden="true" href={`/${user.id}`} className="py-2 px-5 text-center text-[#0f6fec] hover:text-[#0c59bd] cursor-pointer">
            View Profile
          </Link>
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
