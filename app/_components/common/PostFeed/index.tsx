import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Modal from '../Modal';
import CloseIcon from '../../../_assets/icons/CloseIcon';
import InsertPhoto from '../../../_assets/icons/InsertPhoto';
import BaseInput from '../BaseInput';
import BaseTextarea from '../BaseTextarea';
import { createPost } from '@/services/post.services';
import BaseButton from '../BaseButton';
import { getAllPostsAsync } from '../../../../store/reducers/postsReducer';
import { setPosts } from '../../../../store/reducers/newFeedReducer';
import { AppDispatch } from '../../../../store';
import { getUserId } from '@/services/user.services';

interface FormValues {
  title: string;
  text: string;
  image: File;
}

function PostFeed() {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<FormValues>();
  const onCloseModal = () => {
    setIsOpenModal(false);
  };
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file as File);
      formData.append('title', data.title!);
      formData.append('text', data.text!);
      const res = await createPost(formData);
      dispatch(setPosts([res.data.post]));
      dispatch(getAllPostsAsync(getUserId()));
      setIsOpenModal(false);
      toast.success('Tạo bài viết thành công!');
    } catch (err: unknown) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex bg-[#0f0f10] border border-[#0f0f10] rounded-md w-full p-5">
        <div className="h-12 w-12 mr-2">
          <Image src="https://social.webestica.com/assets/images/post/1by1/02.jpg" unoptimized priority width={48} height={48} alt="" className="h-auto rounded-full cursor-pointer" />
        </div>
        <div
          aria-hidden="true"
          className="w-full flex items-center bg-[#26262b] py-3 px-4 rounded-2xl cursor-pointer hover:bg-[#3f3f47] duration-300"
          onClick={() => setIsOpenModal(true)}
        >
          <span className="text-[#b1adb0]">Share your thoughts...</span>
        </div>
      </div>
      <Modal open={isOpenModal} onClose={onCloseModal}>
        <div className="bg-[#26262b] w-[360px] sm:w-[500px] rounded-md">
          <div className="h-[60px] relative">
            <div className="h-full p-4 flex justify-center items-center border-b border-b-[#ffffff0d]">
              <h2>Create Post</h2>
            </div>
            <div
              aria-hidden="true"
              className="absolute right-4 top-3 h-8 w-8 bg-[#0f6fec1a] ml-auto rounded-full flex items-center justify-center hover:bg-[#a1a1a7] duration-300 cursor-pointer"
              onClick={() => setIsOpenModal(false)}
            >
              <CloseIcon color="#0f6fec" />
            </div>
          </div>
          <div className="flex flex-col items-center p-4 border-b border-b-[#ffffff0d]">
            <div className="w-full flex">
              <div className="h-12 w-12 mr-4">
                <Image src="https://social.webestica.com/assets/images/post/1by1/02.jpg" unoptimized width={48} height={48} alt="" className="h-auto rounded-full cursor-pointer" />
              </div>
              <div className="flex flex-col w-full">
                <div className="mb-4">
                  <BaseInput
                    placeholder="Title"
                    {...register('title')}
                  />
                </div>
                <BaseTextarea
                  placeholder="Share your thoughts..."
                  rows={5}
                  {...register('text')}
                />
              </div>
            </div>
            <div className="w-full">
              <p className="mb-2">Upload attachment</p>
              <div className="border-2 border-dashed rounded-md p-5 cursor-pointer w-full flex justify-center items-center relative h-[300px]">
                <div className="w-full h-full relative overflow-y-auto no-scrollbar">
                  <label htmlFor="icon-button-file" className="cursor-pointer w-full h-full flex absolute">
                    <input onChange={onFileChange} id="icon-button-file" type="file" className="hidden" />
                    {file ? (
                      <Image className="border-2 m-auto h-auto cursor-pointer w-full p-4 rounded-md" unoptimized width={100} height={100} src={URL.createObjectURL(file!)} alt="preview avatar" />
                    ) : (
                      <InsertPhoto className="m-auto" width={90} height={90} />
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3">
            <BaseButton onClick={handleSubmit(onSubmit)} loading={loading}>Post</BaseButton>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PostFeed;
