import {
  ChangeEvent, Dispatch, RefObject, SetStateAction, useEffect, useState,
} from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getPost } from '@/services/post.services';
import { PostEntity } from '@/entities/Post.entities';
import CloseIcon from '../../../_assets/icons/CloseIcon';
import InsertPhoto from '../../../_assets/icons/InsertPhoto';
import BaseInput from '../BaseInput';
import BaseTextarea from '../BaseTextarea';
import BaseButton from '../BaseButton';

interface UpdatePostProps {
  postId: string;
  setOpenPostEdit: Dispatch<SetStateAction<boolean>>;
  openPostEdit: boolean;
  PostOptionsRef: RefObject<HTMLDivElement>
}

interface FormValues {
  title: string;
  text: string;
  image: File;
}

function ImagePreview(file?: File, currentPost?: PostEntity) {
  if (file) {
    return (
      <Image
        className="border-2 m-auto h-auto cursor-pointer w-full p-4 rounded-md"
        unoptimized
        width={100}
        height={100}
        src={URL.createObjectURL(file!)}
        alt="preview avatar"
      />
    );
  }
  if (currentPost?.imageUrl) {
    return (
      <Image
        className="border-2 m-auto h-auto cursor-pointer w-full p-4 rounded-md"
        width={100}
        height={100}
        src={currentPost.imageUrl}
        alt="current post"
      />
    );
  }
  return (
    <InsertPhoto className="m-auto" width={90} height={90} />
  );
}

function UpdatePost(props: UpdatePostProps) {
  const { postId, setOpenPostEdit, PostOptionsRef } = props;
  const [currentPosts, setCurrentPosts] = useState<PostEntity>();
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormValues>();

  useEffect(() => {
    (async () => {
      try {
        const res = await getPost(postId);
        setCurrentPosts(res.data.post);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  console.log(currentPosts);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file as File);
      formData.append('title', data.title!);
      formData.append('text', data.text!);
      // await createPost(formData);
      // await getAllPosts(getUserId());
      // await getNewFeed({ offset: 1, limit: 2 });
      setOpenPostEdit(false);
      toast.success('Cập nhật bài viết thành công!');
    } catch (err: unknown) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
    reset();
  };

  return (
    <div className="bg-[#26262b] w-[360px] sm:w-[500px] rounded-md" ref={PostOptionsRef}>
      <div className="h-[60px] relative">
        <div className="h-full p-4 flex justify-center items-center border-b border-b-[#ffffff0d]">
          <h2>Create Post</h2>
        </div>
        <div
          aria-hidden="true"
          className="absolute right-4 top-3 h-8 w-8 bg-[#0f6fec1a] ml-auto rounded-full flex items-center justify-center hover:bg-[#a1a1a7] duration-300 cursor-pointer"
          onClick={() => setOpenPostEdit(false)}
        >
          <CloseIcon color="#0f6fec" />
        </div>
      </div>
      <div className="flex flex-col items-center p-4 border-b border-b-[#ffffff0d]">
        <div className="w-full flex">
          <div className="h-12 w-12 mr-4">
            <Image src={currentPosts?.author.imageUrl || '/DefaultAvatar.svg'} unoptimized width={48} height={48} alt="" className="h-auto rounded-full cursor-pointer" />
          </div>
          <div className="flex flex-col w-full">
            <div className="mb-4">
              <BaseInput
                placeholder="Title"
                {...register('title')}
                defaultValue={currentPosts?.title}
              />
            </div>
            <BaseTextarea
              placeholder="Share your thoughts..."
              rows={5}
              {...register('text')}
              defaultValue={currentPosts?.text}
            />
          </div>
        </div>
        <div className="w-full">
          <p className="mb-2">Upload attachment</p>
          <div className="border-2 border-dashed rounded-md p-5 cursor-pointer w-full flex justify-center items-center relative h-[300px]">
            <div className="w-full h-full relative overflow-y-auto no-scrollbar">
              <label htmlFor="icon-button-file-post" className="cursor-pointer w-full h-full flex absolute">
                <input onChange={onFileChange} id="icon-button-file-post" type="file" className="hidden" />
                {ImagePreview(file, currentPosts)}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <BaseButton onClick={handleSubmit(onSubmit)} loading={loading}>Update Post</BaseButton>
      </div>
    </div>
  );
}

export default UpdatePost;
