'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import BaseButton from '../_components/common/BaseButton';
import PencilEdit from '../_assets/icons/PencilEdit';
import Modal from '../_components/common/Modal';
import EditProfile from './editProfile';

function Profile() {
  const [open, setOpen] = useState(false);
  const onCloseEditProfile = () => {
    setOpen(false);
  };
  const profile = useSelector((state: RootState) => state.profile);
  return (
    <>
      <div className="pt-14 w-full xl:container mx-auto h-ful">
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-1 flex-col w-full lg:w-2/3 mt-6 p-6 bg-[#0f0f10] rounded-md">
            <div className="rounder-md">
              <div className="flex items-center">
                <div className="">
                  <Image className="border-2 rounded-full" width={100} height={100} src="https://social.webestica.com/assets/images/post/1by1/02.jpg" alt="background-image" />
                </div>
                <div className="px-6">
                  <h1 className="font-bold text-xl">{profile.fullName}</h1>
                </div>
                <div className="ml-auto">
                  <BaseButton className="text-[red] hover:bg-[#39435b]" onClick={() => setOpen(true)}>
                    <PencilEdit color="red" />
                    Edit Profile
                  </BaseButton>
                </div>
              </div>
            </div>
            <div>
              card-title
            </div>
            <div>
              body
            </div>
          </div>
          <div className="flex flex-0 ww-full lg:w-1/3 mt-6 px-3">
            right
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={onCloseEditProfile}
      >
        <EditProfile onClose={onCloseEditProfile} />
      </Modal>
    </>
  );
}

export default Profile;
