'use client';

import { usePathname } from 'next/navigation';
import { AppHeader } from '../_components/AppHeader';
import ProfileIcon from '../_assets/icons/ProfileIcon';
import SecurityIcon from '../_assets/icons/SecurityIcon';
import NavLink from '../_components/common/NavLink';

const pathname = [
  {
    path: '/message/user1',
    title: 'User 1',
    icon: <ProfileIcon className="fill-current pr-1" />,
  },
  {
    path: '/message/user2',
    title: 'User 2',
    icon: <SecurityIcon className="fill-current pr-1" />,
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathnameActive = usePathname();

  return (
    <>
      <AppHeader />
      <div className="pt-20 pb-6 px-6 h-screen">
        <div className="bg-[#0f0f10] border border-[#0f0f10] rounded-md flex flex-col lg:flex-row h-full">
          <div className="p-5 min-w-[200px] border-0 border-r-2 border-[#202227]">
            <div>
              <ul>
                {pathname.map((path) => (
                  <li
                    key={path.path}
                  >
                    <NavLink
                      className={`py-2 pl-2 flex items-center hover:text-[#0f6fec] duration-300 cursor-pointer rounded-md ${pathnameActive === path.path ? 'bg-[#1b1f23] text-[#0f6fec]' : ''}`}
                      href={path.path}
                    >
                      {path.icon}
                      {path.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:py-5 px-5 w-full h-full flex items-center justify-center">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
