'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import BaseButton from '../_components/common/BaseButton';
import PencilEdit from '../_assets/icons/PencilEdit';
import Modal from '../_components/common/Modal';
import EditProfile from './editProfile';
import WorkIcon from '../_assets/icons/WorkIcon';
import CalendarIcon from '../_assets/icons/CalendarIcon';
import LocationIcon from '../_assets/icons/LocationIcon';

function Profile() {
  const [open, setOpen] = useState(false);
  const onCloseEditProfile = () => {
    setOpen(false);
  };
  const profile = useSelector((state: RootState) => state.profile);
  const timeCreated = new Date(profile.createdAt);
  // eslint-disable-next-line max-len
  const formatTimeCreated = `Join on ${timeCreated.getDate() > 9 ? timeCreated.getDate() : `0${timeCreated.getDate()}`} / ${timeCreated.getMonth() + 1 > 9 ? timeCreated.getMonth() + 1 : `0${timeCreated.getMonth() + 1}`} / ${timeCreated.getFullYear()}`;
  return (
    <>
      <div className="pt-14 w-full lg:container mx-auto h-full px-3">
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-1 flex-col w-full lg:w-2/3 mt-6 p-6 bg-[#0f0f10] rounded-md">
            <div className="rounder-md mb-4">
              <div className="flex items-center max-md:flex-col gap-2">
                <div>
                  <Image className="border-2 rounded-full h-auto" width={100} height={100} src="https://social.webestica.com/assets/images/post/1by1/02.jpg" alt="background-image" />
                </div>
                <div className="px-2">
                  <h1 className="font-bold text-xl">{profile.fullName}</h1>
                </div>
                <div className="md:ml-auto">
                  <BaseButton className="text-[red] hover:bg-[#39435b]" onClick={() => setOpen(true)}>
                    <PencilEdit color="red" />
                    Edit Profile
                  </BaseButton>
                </div>
              </div>
            </div>
            <div className="flex items-center text-[#a1a1a8]">
              <div className="flex items-center mr-2">
                <div className="mr-1">
                  <WorkIcon fill="#a1a1a8" />
                </div>
                <p>{profile.job}</p>
              </div>
              <div className="flex items-center mr-2">
                <div className="mr-1">
                  <LocationIcon fill="#a1a1a8" />
                </div>
                <p>{profile.location}</p>
              </div>
              <div className="flex items-center mr-2">
                <div className="mr-1">
                  <CalendarIcon fill="#a1a1a8" />
                </div>
                <p>{formatTimeCreated}</p>
              </div>
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
