'use client';

import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
import { getUserId, updateAvatarUser } from '@/services/user.services';
import { addFriend, findFriend, removeFriend } from '@/services/friend.services';
import CheckIcon from '../_assets/icons/CheckIcon';
import PlusIcon from '../_assets/icons/PlusIcon';
import AddAPhotoIcon from '../_assets/icons/AddAPhotoIcon';

function RootLayout({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const { profileId } = useParams();
  const [open, setOpen] = useState(false);
  const [statusAddFriend, setStatusAddFriend] = useState({
    loading: false,
    addedFriend: false,
  });
  const [loadingRemoveFriend, setLoadingRemoveFriend] = useState(false);
  const [openModalRemoveFriend, setOpenModalRemoveFriend] = useState(false);
  const [file, setFile] = useState<File>();
  const dispatch = useDispatch<AppDispatch>();
  const userId = Number(profileId);
  const currentUserId = getUserId() === userId;

  const { user } = useSelector(getUserSelector) as UserType;

  const handleClickTab = (path: string) => {
    router.push(path);
  };

  const onCloseEditProfile = () => {
    setOpen(false);
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    try {
      const formData = new FormData();
      formData.append('image', e.target.files as unknown as File);
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
      case 3: {
        handleClickTab(`/${userId}/photos`);
        break;
      }
      default: {
        handleClickTab(`/${userId}`);
      }
    }
  };

  // get friend
  useEffect(() => {
    (async () => {
      try {
        if (!currentUserId) {
          const res = await findFriend(userId);
          if (res) {
            setStatusAddFriend({
              loading: false,
              addedFriend: true,
            });
          }
        }
      } catch (err) {
        setStatusAddFriend({
          loading: false,
          addedFriend: false,
        });
      }
    })();
  }, []);

  // add friend
  const onAddFriend = async () => {
    setStatusAddFriend({
      loading: true,
      addedFriend: false,
    });
    try {
      await addFriend(userId);
      toast.success('Thêm bạn thành công');
    } catch (err) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setStatusAddFriend({
        loading: false,
        addedFriend: true,
      });
    }
  };

  // remove friend
  const onRemoveFriend = async () => {
    setLoadingRemoveFriend(true);
    try {
      await removeFriend(userId);
      setStatusAddFriend({
        loading: false,
        addedFriend: false,
      });
      setLoadingRemoveFriend(false);
      toast.success('Xóa bạn thành công');
    } catch (err) {
      console.log(err.message);
      toast.error('Xóa bạn thất bại');
    }
  };
  const modalConfirmRemoveFriend = () => (
    <Modal
      open={openModalRemoveFriend}
      onClose={() => setOpenModalRemoveFriend(false)}
    >
      <div className="p-5 bg-[#26262b] rounded-md">
        <p className="mb-4">Do you want to remove this person?</p>
        <div className="flex gap-4">
          <BaseButton
            onClick={() => {
              onRemoveFriend();
              setOpenModalRemoveFriend(false);
            }}
            loading={loadingRemoveFriend}
          >
            Confirm
          </BaseButton>
          <BaseButton
            className="text-[red] hover:bg-[red] hover:text-[white]"
            onClick={() => setOpenModalRemoveFriend(false)}
          >
            Cancel
          </BaseButton>
        </div>
      </div>
    </Modal>
  );

  // status add friend
  const statusFriend = () => {
    if (statusAddFriend.loading) {
      return (
        <div className="md:ml-auto">
          <BaseButton
            className="text-[red] hover:bg-[#39435b]"
            onClick={onAddFriend}
            aria-hidden
            loading={statusAddFriend.loading}
          >
            Thêm bạn
          </BaseButton>
        </div>
      );
    }
    if (statusAddFriend.addedFriend) {
      return (
        <div className="md:ml-auto">
          <BaseButton
            className="text-[red] hover:bg-[#39435b]"
            onClick={() => {
              setOpenModalRemoveFriend(true);
            }}
            aria-hidden
          >
            <span className="mr-2">Bạn bè</span>
            <CheckIcon fill="#0f6fec" width={16} height={16} />
          </BaseButton>
        </div>
      );
    }
    return (
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
                  <div className="w-[100px] h-[100px] relative">
                    <div className="absolute right-1 z-10 w-full h-full">
                      <label htmlFor="icon-button-file" className="cursor-pointer w-full h-full block">
                        <div>
                          <AddAPhotoIcon fill="white" />
                        </div>
                        <input onChange={onFileChange} id="icon-button-file" type="file" className="hidden" />
                      </label>
                    </div>
                    {file ? (
                      <Image className="border-2 rounded-full m-auto w-[100px] h-[100px] cursor-pointer" unoptimized width={100} height={100} src={URL.createObjectURL(file!)} alt="preview avatar" />
                    ) : (
                      <Image
                        className="border-2 rounded-full m-auto w-[100px] h-[100px] cursor-pointer"
                        unoptimized
                        width={100}
                        height={100}
                        src={user.imageUrl || '/DefaultAvatar.svg'}
                        alt="avatar"
                      />
                    )}
                  </div>
                  <div className="flex justify-center items-center flex-1">
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
                  <TabItem label="Photos" path={`/${userId}/photos`} />
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
      {modalConfirmRemoveFriend()}
    </>
  );
}

export default withAuthetication(RootLayout);
