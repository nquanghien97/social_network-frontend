import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { CommentEntity } from '@/entities/Comment.entities';
import BaseInput from '../../../BaseInput';
import { RootState } from '../../../../../../store';
import SendIcon from '../../../../../_assets/icons/SendIcon';
import CloseIcon from '../../../../../_assets/icons/CloseIcon';
import { timeSince } from '../../../../../../utils/date';

interface CommentProps {
  comment: CommentEntity
  addReply: ({ parentId, content } : { parentId?: string, content: string }) => void
}

function Comment(props: CommentProps) {
  const { comment, addReply } = props;
  const [replyText, setReplyText] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);
  const profile = useSelector((state: RootState) => state.profile);
  const inputEl = useRef<HTMLInputElement>(null);
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
          <div className="bg-[#202227] flex flex-col w-full rounded-md px-4 py-2">
            <h5 className="font-bold">{comment.author.fullName}</h5>
            <p className="text-sm py-1">{comment.content}</p>
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
          <div className="ml-2 w-full relative">
            <BaseInput
              ref={inputEl}
              onChange={(e) => {
                setReplyText(e.target.value);
              }}
              type="text"
              fullWidth
              className="w-full"
              placeholder="Viết bình luận"
              endIcon={(
                <div>
                  <button
                    type="button"
                    className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer absolute right-10 top-0.5"
                    onClick={() => {
                      addReply({ parentId: comment.id, content: replyText });
                      setReplyText('');
                      setShowReplyBox(false);
                    }}
                  >
                    <SendIcon />
                  </button>
                  <button
                    type="button"
                    className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer absolute right-2 top-0.5"
                    onClick={() => {
                      setShowReplyBox(false);
                      setReplyText('');
                    }}
                  >
                    <CloseIcon fill="white" />
                  </button>
                </div>
              )}
            />
          </div>
        </div>
      )}
      {comment.children.length > 0 && (
        <ul>
          {comment.children.map((childComment) => (
            <Comment
              key={childComment.id}
              comment={childComment}
              addReply={addReply}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default Comment;
