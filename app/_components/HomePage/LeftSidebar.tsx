import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export function LeftSidebarItem() {
  const profile = useSelector((state: RootState) => state.profile);
  return (
    <div className="lg:mt-4">
      <div className="bg-[#0f0f10] border border-[#0f0f10] rounded-md">
        <div className="p-5">
          <div>
            <div className="text-center">
              <div className="h-16 w-16 m-auto mb-4">
                {profile.imageUrl && (
                  <Image src={profile.imageUrl} width={100} height={100} alt="Default Avatar" unoptimized className="w-full h-full rounded-md" />
                )}
              </div>
              <h5 className="text-xl">{profile.fullName}</h5>
              <small className="text-sm text-[#ccc]">{profile.job}</small>
              <p className="my-4 text-[#ccc] text-sm">{profile.description}</p>
              <div>Thông số</div>
            </div>
            <hr className="my-4" />
            <ul>
              <li className="py-1.5 hover:text-[#0f6fec] cursor-pointer">
                <Link href="/profile">Feed</Link>
              </li>
              <li className="py-1.5 hover:text-[#0f6fec] cursor-pointer">
                <Link href="/profile/friends">Connections</Link>
              </li>
              <li className="py-1.5 hover:text-[#0f6fec] cursor-pointer">Latest News</li>
              <li className="py-1.5 hover:text-[#0f6fec] cursor-pointer">Events</li>
              <li className="py-1.5 hover:text-[#0f6fec] cursor-pointer">Groups</li>
              <li className="py-1.5 hover:text-[#0f6fec] cursor-pointer">Notifications</li>
              <li className="py-1.5 hover:text-[#0f6fec] cursor-pointer">Settings</li>
            </ul>
          </div>
          <hr className="my-4" />
          <Link scroll={false} aria-hidden="true" href="/profile" className="py-2 px-5 text-center text-[#0f6fec] hover:text-[#0c59bd] cursor-pointer">
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
