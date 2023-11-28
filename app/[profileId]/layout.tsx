'use client';

import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AppHeader } from '../_components/AppHeader';
import { AppDispatch } from '../../store';
import WorkIcon from '../_assets/icons/WorkIcon';
import CalendarIcon from '../_assets/icons/CalendarIcon';
import LocationIcon from '../_assets/icons/LocationIcon';
import TabList from '../_components/common/TabList';
import TabItem from '../_components/common/TabItem';
import withAuthetication from '../../hocs/withAuthentication';
import { UserType, getUserAsync, getUserSelector } from '../../store/reducers/userReducer';
import BaseButton from '../_components/common/BaseButton';
import PencilEdit from '../_assets/icons/PencilEdit';
import Modal from '../_components/common/Modal';
import EditProfile from './_editProfile';
import { getUserId } from '@/services/user.services';
import { addFriend } from '@/services/friend.services';
import LoadingIcon from '../_assets/icons/LoadingIcon';
import CheckIcon from '../_assets/icons/CheckIcon';
import PlusIcon from '../_assets/icons/PlusIcon';

function RootLayout({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const param = usePathname();
  const [open, setOpen] = useState(false);
  const [statusAddFriend, setStatusAddFriend] = useState({
    loading: false,
    addedFriend: false,
  });
  const dispatch = useDispatch<AppDispatch>();
  const userId = Number(param.slice(1, 2));
  const currentUserId = getUserId() === userId;

  const { user } = useSelector(getUserSelector) as UserType;

  const handleClickTab = (path: string) => {
    router.push(path);
  };

  const onCloseEditProfile = () => {
    setOpen(false);
  };

  const handleChangeTab = (value: number) => {
    switch (value) {
      case 0: {
        handleClickTab(`/${userId}`);
        break;
      }
      case 1: {
        handleClickTab(`/${userId}/about`);
        break;
      }
      case 2: {
        handleClickTab(`/${userId}/friends`);
        break;
      }
      default: {
        handleClickTab(`/${userId}`);
      }
    }
  };

  const onAddFriend = async () => {
    setStatusAddFriend({
      loading: true,
      addedFriend: false,
    });
    try {
      await addFriend(userId);
    } catch (err) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setStatusAddFriend({
        loading: false,
        addedFriend: true,
      });
    }
  };
  const statusFriend = () => {
    if (statusAddFriend.loading) {
      return (
        <div className="md:ml-auto">
          <BaseButton
            className="text-[red] hover:bg-[#39435b]"
            onClick={onAddFriend}
            aria-hidden
          >
            Thêm bạn
            <LoadingIcon />
          </BaseButton>
        </div>
      );
    }
    if (statusAddFriend.addedFriend) {
      return (
        <div className="md:ml-auto">
          <BaseButton
            className="text-[red] hover:bg-[#39435b]"
            onClick={onAddFriend}
            aria-hidden
          >
            <span className="mr-2">Bạn bè</span>
            <CheckIcon fill="#0f6fec" width={16} height={16} />
          </BaseButton>
        </div>
      );
    }
    return (
      // <div
      //   onClick={onAddFriend}
      //   aria-hidden
      //   className="w-full h-full flex items-center justify-center"
      // >
      //   <PlusIcon fill="#0f6fec" width={16} height={16} />
      // </div>
      <div className="md:ml-auto">
        <BaseButton
          className="text-[red] hover:bg-[#39435b]"
          onClick={onAddFriend}
          aria-hidden
        >
          <span className="mr-2">Thêm bạn</span>
          <PlusIcon fill="#0f6fec" width={16} height={16} />
        </BaseButton>
      </div>
    );
  };

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getUserAsync(userId));
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch]);

  const timeCreated = new Date(user.createdAt);
  // eslint-disable-next-line max-len
  const formatTimeCreated = `Tham gia vào ${timeCreated.getDate() > 9 ? timeCreated.getDate() : `0${timeCreated.getDate()}`} / ${timeCreated.getMonth() + 1 > 9 ? timeCreated.getMonth() + 1 : `0${timeCreated.getMonth() + 1}`} / ${timeCreated.getFullYear()}`;
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
                    <Image className="border-2 rounded-full w-full h-full" width={100} height={100} src={user.imageUrl || '/DefaultAvatar.svg'} alt="avatar" unoptimized />
                  </div>
                  <div className="px-4 pt-3">
                    <h1 className="font-bold text-xl">{user.fullName}</h1>
                    <p className="text-[#a1a1a8]">{`${user.friendQuantity} bạn bè`}</p>
                  </div>
                  {currentUserId ? (
                    <div className="md:ml-auto">
                      <BaseButton className="text-[red] hover:bg-[#39435b]" onClick={() => setOpen(true)}>
                        <PencilEdit color="red" />
                        Edit Profile
                      </BaseButton>
                    </div>
                  ) : statusFriend()}
                </div>
              </div>
              <div className="flex items-center text-[#a1a1a8] px-6">
                {user.job && (
                  <div className="flex items-center mr-4">
                    <div className="mr-1">
                      <WorkIcon fill="#a1a1a8" />
                    </div>
                    <p>{user.job}</p>
                  </div>
                )}
                {user.location && (
                  <div className="flex items-center mr-4">
                    <div className="mr-1">
                      <LocationIcon fill="#a1a1a8" />
                    </div>
                    <p>{user.location}</p>
                  </div>
                )}
                <div className="flex items-center mr-4">
                  <div className="mr-1">
                    <CalendarIcon fill="#a1a1a8" />
                  </div>
                  <p>{formatTimeCreated}</p>
                </div>
              </div>
              <div className="border-t-[1px] mt-4 border-[#202227]">
                <TabList handleTabClick={handleChangeTab}>
                  <TabItem label="Post" path={`/${userId}`} />
                  <TabItem label="About" path={`/${userId}/about`} />
                  <TabItem label="Friends" path={`/${userId}/friends`} />
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
