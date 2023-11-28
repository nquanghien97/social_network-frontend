import { useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { deleteComments, getComments, postComments } from '@/services/comments.services';
import Comment from './Comment';
import { CommentEntity } from '@/entities/Comment.entities';
import BaseInput from '../../../BaseInput';
import SendIcon from '../../../../../_assets/icons/SendIcon';
import { RootState } from '../../../../../../store';

interface CommentsProps {
  // imageUrl?: string;
  postId: string;
  comments?: CommentEntity[];
  hasFirstComment?: boolean;
}

interface CommentFormState {
  comment: string;
}

const schema = yup
  .object({
    comment: yup
      .string()
      .required('Bạn phải nhập bình luận'),
  });

function Comments(props: CommentsProps) {
  const router = useRouter();
  const { postId, comments, hasFirstComment } = props;
  const [listComments, setListComments] = useState(comments);
  const profile = useSelector((state: RootState) => state.profile);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormState>({
    resolver: yupResolver(schema),
  });

  const fetchComments = async () => {
    if (hasFirstComment) {
      const res = await getComments({ postId });
      setListComments(res.data.comments);
    }
    return null;
  };
  useEffect(() => {
    fetchComments();
  }, []);
  const onDeleteComment = async (commentId: string) => {
    try {
      await deleteComments({ commentId });
      await fetchComments();
      toast.success('Xóa bình luận thành công');
    } catch (err) {
      console.log(err.message);
    }
  };
  const addReply = async ({ content, parentId } : { content: string, parentId?: string }) => {
    try {
      await postComments({ postId, content, parentId });
      await fetchComments();
    } catch (err) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const onSendComment: SubmitHandler<CommentFormState> = async (data: CommentFormState) => {
    await addReply({ content: data.comment });
    reset();
  };

  return (
    <>
      <ul className="[&>*]:pl-0">
        {listComments?.map((comment: CommentEntity) => (
          <Comment key={comment.id} comment={comment} addReply={addReply} onDeleteComment={onDeleteComment} />
        ))}
      </ul>
      <div className="flex w-full items-center">
        <div className="h-10 w-10">
          <Image
            src={profile.imageUrl || '/DefaultAvatar.svg'}
            alt="avatar"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        {!hasFirstComment ? (
          <div
            aria-hidden="true"
            className="w-full flex items-center bg-[#26262b] py-2 px-4 rounded-2xl cursor-pointer hover:bg-[#3f3f47] duration-300 ml-2"
            onClick={() => router.push(`/posts/${postId}`)}
          >
            <span className="text-[#b1adb0]">Xem và để lại bình luận</span>
          </div>
        ) : (
          <form
            className="ml-2 w-full relative [&>div]:mb-0"
            onSubmit={handleSubmit(onSendComment)}
          >
            <BaseInput
              {...register('comment')}
              message={errors.comment?.message}
              type="text"
              fullWidth
              className="w-full"
              placeholder="Viết bình luận"
              endIcon={(
                <button
                  type="submit"
                  className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer absolute right-2 top-0.5"
                >
                  <SendIcon />
                </button>
              )}
            />
          </form>
        )}
      </div>
    </>
  );
}

export default Comments;
