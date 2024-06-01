import { useState } from 'react';
import Image from 'next/image';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CommentEntity } from '@/entities/Comment.entities';
import { useAuth } from '@/zustand/auth.store';
import SendIcon from '@/assets/icons/SendIcon';
import CloseIcon from '@/assets/icons/CloseIcon';
import MoreHorizIcon from '@/assets/icons/MoreHorizIcon';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { timeSince } from '@/utils/date';
import BaseInput from '@/components/common/BaseInput';
import NavLink from '@/components/common/NavLink';
import CommentOptions from './CommentOptions';

interface CommentProps {
  comment: CommentEntity
  addReply: ({ parentId, content } : { parentId?: string, content: string }) => Promise<void>
  onDeleteComment?: (id: string) => Promise<void>
  hasFirstComment?: boolean
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

function Comment(props: CommentProps) {
  const {
    comment,
    addReply,
    onDeleteComment,
    hasFirstComment,
  } = props;
  const [showReplyBox, setShowReplyBox] = useState(false);
  const { user } = useAuth();
  const [openCommentOptions, setOpenCommentOptions] = useState(false);
  const CommentOptionsRef = useOutsideClick(() => setOpenCommentOptions(false));
  const hasDeleteComment = user.id === comment.author.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormState>({
    resolver: yupResolver(schema),
  });

  const onSendComment: SubmitHandler<CommentFormState> = async (data) => {
    await addReply({ parentId: comment.id, content: data.comment });
    setShowReplyBox(false);
    reset();
  };
  return (
    <li key={comment.id} className="pl-6 w-full py-1">
      <div className="flex gap-2">
        <NavLink className="w-12 h-12" href={`/${comment.author.id}`}>
          <Image
            src={comment.author.imageUrl || '/DefaultAvatar.svg'}
            alt="avatar"
            width={48}
            height={48}
            className="rounded-full cursor-pointer w-full h-full"
          />
        </NavLink>
        <div className="flex flex-col flex-1 gap-2">
          <div className="bg-[#202227] flex justify-between w-full rounded-md px-4 py-2">
            <div>
              <NavLink className="font-bold cursor-pointer" href={`/${comment.author.id}`}>{comment.author.fullName}</NavLink>
              <p className="text-sm py-1">{comment.content}</p>
            </div>
            { hasFirstComment && (
              <div
                className="h-10 w-10 bg-[#0f6fec1a] ml-auto rounded-full flex items-center justify-center hover:bg-[#a1a1a7] duration-300 cursor-pointer relative"
                aria-hidden
              >
                <div
                  onClick={() => setOpenCommentOptions(!openCommentOptions)}
                  aria-hidden
                  className="w-full h-full flex items-center justify-center"
                >
                  <MoreHorizIcon fill="#0f6fec" width={16} height={16} />
                </div>
                {openCommentOptions && (
                  <CommentOptions
                    onDeleteComment={onDeleteComment}
                    hasDeleteComment={hasDeleteComment}
                    CommentOptionsRef={CommentOptionsRef}
                    setOpenCommentOptions={setOpenCommentOptions}
                    commentId={comment.id}
                  />
                )}
              </div>
            )}
          </div>
          {hasFirstComment && (
            <div className="flex gap-4 items-center text-[#a1a1a8] p-2">
              <button
                type="button"
                className="text-sm hover:text-[#0f6fec] duration-300 cursor-pointer"
              >
                Like
              </button>
              <button
                type="button"
                className="text-sm hover:text-[#0f6fec] duration-300 cursor-pointer"
                onClick={() => {
                  setShowReplyBox(true);
                }}
              >
                Reply
              </button>
              <p className="text-xs">{timeSince(new Date(comment.updatedAt))}</p>
            </div>
          )}
        </div>
      </div>
      {showReplyBox && (
        <div className="w-full flex pl-6 gap-2">
          <div className="h-12 w-12">
            <Image
              src={user.imageUrl || '/DefaultAvatar.svg'}
              alt="avatar"
              width={48}
              height={48}
              className="rounded-full w-full h-full"
            />
          </div>
          <form className="gap-2 w-full relative mb-4" onSubmit={handleSubmit(onSendComment)}>
            <BaseInput
              {...register('comment')}
              type="text"
              fullWidth
              className="w-full"
              placeholder="Viết bình luận"
              message={errors.comment?.message}
              endIcon={(
                <div>
                  <button
                    type="submit"
                    className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer absolute right-10 top-0.5"
                  >
                    <SendIcon />
                  </button>
                  <button
                    type="button"
                    className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer absolute right-2 top-0.5"
                    onClick={() => {
                      setShowReplyBox(false);
                      reset();
                    }}
                  >
                    <CloseIcon color="white" />
                  </button>
                </div>
              )}
            />
          </form>
        </div>
      )}
      {comment?.children?.length > 0 && (
        <ul>
          {comment.children.map((childComment) => (
            <Comment
              key={childComment.id}
              comment={childComment}
              addReply={addReply}
              onDeleteComment={onDeleteComment}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default Comment;
