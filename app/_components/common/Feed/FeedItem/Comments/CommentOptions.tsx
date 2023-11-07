import {
  Dispatch,
  RefObject,
  SetStateAction,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from '../../../Modal';
import BaseButton from '../../../BaseButton';
import { AppDispatch } from '../../../../../../store';
import { deletePost } from '@/services/post.services';
import { getAllPostsAsync } from '../../../../../../store/reducers/postsReducer';

interface PostOptionsProps {
  PostOptionsRef: RefObject<HTMLDivElement>
  setOpenFeedOptions: Dispatch<SetStateAction<boolean>>
  postId: string;
  hasDeletePost?: boolean;
}

function PostOptions(props: PostOptionsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    PostOptionsRef, setOpenFeedOptions, postId, hasDeletePost,
  } = props;
  const [openModalDeletePost, setOpenModalDeletePost] = useState(false);

  const onDeletePost = async (id: string) => {
    try {
      await deletePost({ postId: id });
      toast.success('Xóa bài viết thành công');
      dispatch(getAllPostsAsync());
    } catch (err) {
      console.log(err.message);
    }
  };

  const onConfirmClick = async () => {
    try {
      if (onDeletePost) {
        await onDeletePost(postId);
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
          {hasDeletePost && (
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
