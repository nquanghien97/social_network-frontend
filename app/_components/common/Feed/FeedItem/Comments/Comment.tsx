import { useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CommentEntity } from '@/entities/Comment.entities';
import BaseInput from '../../../BaseInput';
import { RootState } from '../../../../../../store';
import SendIcon from '../../../../../_assets/icons/SendIcon';
import CloseIcon from '../../../../../_assets/icons/CloseIcon';
import { timeSince } from '../../../../../../utils/date';
import CommentOptions from './CommentOptions';
import MoreHorizIcon from '../../../../../_assets/icons/MoreHorizIcon';
import { useOutsideClick } from '../../../../../_hooks/useOutsideClick';

interface CommentProps {
  comment: CommentEntity
  addReply: ({ parentId, content } : { parentId?: string, content: string }) => Promise<void>
  onDeleteComment?: (id: string) => Promise<void>
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
  const { comment, addReply, onDeleteComment } = props;
  const [showReplyBox, setShowReplyBox] = useState(false);
  const profile = useSelector((state: RootState) => state.profile);
  const [openCommentOptions, setOpenCommentOptions] = useState(false);
  const CommentOptionsRef = useOutsideClick(() => setOpenCommentOptions(false));
  const hasDeleteComment = profile.id === comment.author.id;

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
      <div className="flex">
        <div className="w-10 h-10">
          <Image
            src={comment.author.imageUrl || '/DefaultAvatar.svg'}
            alt="avatar"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col w-full ml-2">
          <div className="bg-[#202227] flex justify-between w-full rounded-md px-4 py-2">
            <div>
              <h5 className="font-bold">{comment.author.fullName}</h5>
              <p className="text-sm py-1">{comment.content}</p>
            </div>
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
          </div>
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
        </div>
      </div>
      {showReplyBox && (
        <div className="w-full flex pl-6">
          <div className="h-10 w-10">
            <Image
              src={profile.imageUrl || '/DefaultAvatar.svg'}
              alt="avatar"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <form className="ml-2 w-full relative mb-4" onSubmit={handleSubmit(onSendComment)}>
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
                    <CloseIcon fill="white" />
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
