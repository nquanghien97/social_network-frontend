import {
  Dispatch,
  RefObject,
  SetStateAction,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import Modal from '../../Modal';
import BaseButton from '../../BaseButton';
import { deletePost } from '@/services/post.services';
import { useAuth } from '@/zustand/auth.store';
import { usePost } from '@/zustand/posts.store';
import { useNewFeed } from '@/zustand/newfeed.store';

interface PostOptionsProps {
  PostOptionsRef: RefObject<HTMLDivElement>
  setOpenFeedOptions: Dispatch<SetStateAction<boolean>>
  postId: string;
  authorId: string;
}

function PostOptions(props: PostOptionsProps) {
  const { getNewFeed } = useNewFeed();
  const {
    PostOptionsRef, setOpenFeedOptions, postId, authorId,
  } = props;

  const { user } = useAuth();
  const { getAllPosts } = usePost();

  const [openModalDeletePost, setOpenModalDeletePost] = useState(false);
  const [loading, setLoading] = useState(false);
  const onDeletePost = async () => {
    setLoading(true);
    try {
      await deletePost({ postId });
      toast.success('Xóa bài viết thành công');
      await getAllPosts(user.id);
      await getNewFeed({ limit: 2, offset: 1 });
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onSharePost = () => {
    toast.info('Tính năng đang phát triển');
  };

  const onConfirmClick = async () => {
    try {
      if (onDeletePost) {
        await onDeletePost();
      }
      setOpenModalDeletePost(false);
      setOpenFeedOptions(false);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <div
        className="px-4 py-2 bg-[#26262b] absolute top-full right-0 rounded-md min-w-[120px]"
        ref={PostOptionsRef}
      >
        <ul className="w-full">
          {user.id === authorId && (
            <li
              className="py-2 hover:text-[#0f6fec] cursor-pointer duration-300 w-full"
              onClick={() => {
                setOpenModalDeletePost(true);
              }}
              aria-hidden
            >
              Delete Post
            </li>
          )}
          <li
            className="py-2 hover:text-[#0f6fec] cursor-pointer duration-300 w-full"
            onClick={onSharePost}
            aria-hidden
          >
            Share Post
          </li>
        </ul>
      </div>
      <Modal
        open={openModalDeletePost}
        onClose={() => setOpenModalDeletePost(false)}
      >
        <div className="p-5 bg-[#26262b] rounded-md" ref={PostOptionsRef}>
          <p className="mb-4">Do you want to delete this post?</p>
          <div className="flex gap-4">
            <BaseButton
              onClick={onConfirmClick}
              loading={loading}
            >
              Confirm
            </BaseButton>
            <BaseButton
              className="text-[red] hover:bg-[red] hover:text-[white]"
              onClick={() => {
                setOpenModalDeletePost(false);
                setOpenFeedOptions(false);
              }}
            >
              Cancel
            </BaseButton>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PostOptions;
