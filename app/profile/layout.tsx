'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppHeader } from '../_components/AppHeader';
import withAuthetication from '../../hocs/withAuthentication';
import { RootState } from '../../store';
import BaseButton from '../_components/common/BaseButton';
import PencilEdit from '../_assets/icons/PencilEdit';
import Modal from '../_components/common/Modal';
import EditProfile from './editProfile';
import WorkIcon from '../_assets/icons/WorkIcon';
import CalendarIcon from '../_assets/icons/CalendarIcon';
import LocationIcon from '../_assets/icons/LocationIcon';
import TabList from '../_components/common/TabList';
import TabItem from '../_components/common/TabItem';

function RootLayout({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const onCloseEditProfile = () => {
    setOpen(false);
  };

  const handleClickTab = (path: string) => {
    router.push(path);
  };

  const handleChangeTab = (value: number) => {
    switch (value) {
      case 0: {
        handleClickTab('/profile');
        break;
      }
      case 1: {
        handleClickTab('/profile/about');
        break;
      }
      case 2: {
        handleClickTab('/profile/friends');
        break;
      }
      default: {
        handleClickTab('/profile');
      }
    }
  };

  const profile = useSelector((state: RootState) => state.profile);
  const timeCreated = new Date(profile.createdAt);
  // eslint-disable-next-line max-len
  const formatTimeCreated = `Join on ${timeCreated.getDate() > 9 ? timeCreated.getDate() : `0${timeCreated.getDate()}`} / ${timeCreated.getMonth() + 1 > 9 ? timeCreated.getMonth() + 1 : `0${timeCreated.getMonth() + 1}`} / ${timeCreated.getFullYear()}`;
  return (
    <>
      <AppHeader />
      <div className="pt-14 w-full lg:container mx-auto h-full px-3">
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-1 flex-col w-full gap-4 lg:w-2/3 mt-6">
            <div className="flex flex-col w-full bg-[#0f0f10] rounded-md">
              <div className="rounder-md mb-4 p-6">
                <div className="flex items-center max-md:flex-col">
                  <div className="w-[100px] h-[100px]">
                    {profile.imageUrl && (
                      <Image className="border-2 rounded-full w-full h-full" width={100} height={100} src={profile.imageUrl} alt="avatar" unoptimized />
                    )}
                  </div>
                  <div className="px-4 pt-3">
                    <h1 className="font-bold text-xl">{profile.fullName}</h1>
                    <p className="text-[#a1a1a8]">{`${profile.friendQuantity} friends`}</p>
                  </div>
                  <div className="md:ml-auto">
                    <BaseButton className="text-[red] hover:bg-[#39435b]" onClick={() => setOpen(true)}>
                      <PencilEdit color="red" />
                      Edit Profile
                    </BaseButton>
                  </div>
                </div>
              </div>
              <div className="flex items-center text-[#a1a1a8] px-6">
                <div className="flex items-center mr-4">
                  <div className="mr-1">
                    <WorkIcon fill="#a1a1a8" />
                  </div>
                  <p>{profile.job}</p>
                </div>
                <div className="flex items-center mr-4">
                  <div className="mr-1">
                    <LocationIcon fill="#a1a1a8" />
                  </div>
                  <p>{profile.location}</p>
                </div>
                <div className="flex items-center mr-4">
                  <div className="mr-1">
                    <CalendarIcon fill="#a1a1a8" />
                  </div>
                  <p>{formatTimeCreated}</p>
                </div>
              </div>
              <div className="border-t-[1px] mt-4 border-[#202227]">
                <TabList handleTabClick={handleChangeTab}>
                  <TabItem label="Post" path="/profile" />
                  <TabItem label="About" path="/profile/about" />
                  <TabItem label="Friends" path="/profile/friends" />
                </TabList>
              </div>
            </div>
            {children}
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

export default withAuthetication(RootLayout);
