'use client';

import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import { AppHeader } from '@/components/AppHeader';
import NavLink from '@/components/common/NavLink';
import { useAuth } from '@/zustand/auth.store';
import SecurityIcon from '@/assets/icons/SecurityIcon';
import ProfileIcon from '@/assets/icons/ProfileIcon';
import AddAPhotoIcon from '@/assets/icons/AddAPhotoIcon';
import { updateAvatarUser } from '@/services/user.services';

const pathname = [
  {
    path: '/settings',
    title: 'Profile',
    icon: <ProfileIcon className="fill-current pr-1" />,
  },
  {
    path: '/settings/password',
    title: 'Password',
    icon: <SecurityIcon className="fill-current pr-1" />,
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth();
  const pathnameActive = usePathname();
  const [file, setFile] = useState<File>();
  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    try {
      const formData = new FormData();
      formData.append('image', e.target.files[0] as unknown as File);
      await updateAvatarUser(formData);
      setFile(e.target.files[0]);
      toast.success('Cập nhật thành công', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error('Cập nhật thất bại, vui lòng thử lại', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <AppHeader />
      <div className="pt-14 px-6">
        <div className="flex p-4 bg-[#0f0f10] border border-[#0f0f10] rounded-md my-2">
          <div className="w-[80px] h-[80px] relative mr-4">
            <div className="absolute right-1 z-10 w-full h-full">
              <label htmlFor="icon-button-file-avatar" className="cursor-pointer w-full h-full block">
                <div>
                  <AddAPhotoIcon fill="white" />
                </div>
                <input onChange={onFileChange} id="icon-button-file-avatar" type="file" className="hidden" />
              </label>
            </div>
            {file ? (
              <Image className="border-2 rounded-full w-[80px] h-[80px] m-auto cursor-pointer" unoptimized width={80} height={80} src={URL.createObjectURL(file!)} alt="preview avatar" />
            ) : (
              <Image
                className="border-2 rounded-full w-[80px] h-[80px] m-auto cursor-pointer"
                unoptimized
                width={80}
                height={80}
                src={user.imageUrl || '/DefaultAvatar.svg'}
                alt="avatar"
              />
            )}
          </div>
          <div className="flex flex-col">
            <h5 className="text-xl">{user.fullName}</h5>
            <small className="text-sm text-[#ccc]">{user.job}</small>
            <small className="text-sm text-[#ccc] italic">{user.description}</small>
          </div>
        </div>
        <div className="bg-[#0f0f10] border border-[#0f0f10] rounded-md flex flex-col lg:flex-row">
          <div className="p-5 min-w-[200px]">
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
          <div className="lg:py-5 px-5 w-full">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
