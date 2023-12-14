import {
  Dispatch,
  RefObject,
  SetStateAction,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from '../../Modal';
import BaseButton from '../../BaseButton';
import { AppDispatch, RootState } from '../../../../../store';
import { deletePost } from '@/services/post.services';
import { getAllPostsAsync } from '../../../../../store/reducers/postsReducer';
import { deletedPost, getNewFeedAsync } from '../../../../../store/reducers/newFeedReducer';

interface PostOptionsProps {
  PostOptionsRef: RefObject<HTMLDivElement>
  setOpenFeedOptions: Dispatch<SetStateAction<boolean>>
  postId: string;
  authorId: number
}

function PostOptions(props: PostOptionsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    PostOptionsRef, setOpenFeedOptions, postId, authorId,
  } = props;
  const profile = useSelector((state: RootState) => state.profile);

  const [openModalDeletePost, setOpenModalDeletePost] = useState(false);
  const [loading, setLoading] = useState(false);
  const onDeletePost = async () => {
    setLoading(true);
    try {
      const postDeleted = await deletePost({ postId });
      toast.success('Xóa bài viết thành công');
      dispatch(getAllPostsAsync(profile.id));
      dispatch(getNewFeedAsync({ limit: 2, offset: 1 }));
      dispatch(deletedPost(postDeleted.data.post));
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
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
          {profile.id === authorId && (
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
