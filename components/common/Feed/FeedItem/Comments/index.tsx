import { useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { deleteComments, getComments, postComments } from '@/services/comments.services';
import { CommentEntity } from '@/entities/Comment.entities';
import { useAuth } from '@/zustand/auth.store';
import BaseInput from '@/components/common/BaseInput';
import SendIcon from '@/assets/icons/SendIcon';
import NavLink from '@/components/common/NavLink';
import Comment from './Comment';

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
  const { postId, comments, hasFirstComment } = props;
  const [listComments, setListComments] = useState(comments);
  const { user } = useAuth();

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
          <Comment key={comment.id} comment={comment} addReply={addReply} onDeleteComment={onDeleteComment} hasFirstComment={hasFirstComment} />
        ))}
      </ul>
      <div className="flex w-full items-center">
        <Image
          src={user.imageUrl || '/DefaultAvatar.svg'}
          alt="avatar"
          width={48}
          height={48}
          className="rounded-full w-12 h-12"
        />
        {!hasFirstComment ? (
          <NavLink
            className="w-full flex items-center bg-[#26262b] my-2 py-2 px-4 rounded-2xl cursor-pointer hover:bg-[#3f3f47] duration-300 ml-2"
            href={`/posts/${postId}`}
          >
            <span className="text-[#b1adb0]">Xem và để lại bình luận</span>
          </NavLink>
        ) : (
          <form
            className="ml-2 relative [&>div]:mb-0 flex-1"
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
