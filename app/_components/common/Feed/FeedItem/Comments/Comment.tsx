import { useRef, useState } from 'react';
import Image from 'next/image';
import { CommentEntity } from '@/entities/Comment.entities';
import BaseInput from '../../../BaseInput';

interface CommentProps {
  comment: CommentEntity
  addReply: (commentId: string, replyText: string) => void
}

function Comment(props: CommentProps) {
  const { comment, addReply } = props;
  const [replyText, setReplyText] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null);
  return (
    <li key={comment.id} className="pl-6 w-full py-2">
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
          <div className="flex gap-4">
            <button
              type="button"
              className="py-1.5 hover:text-[#0f6fec] cursor-pointer"
            >
              like
            </button>
            <button
              type="button"
              className="py-1.5 hover:text-[#0f6fec] cursor-pointer"
              onClick={() => {
                setShowReplyBox(true);
              }}
            >
              reply
            </button>
          </div>
        </div>
      </div>
      {showReplyBox && (
        <>
          <BaseInput
            ref={inputEl}
            onChange={(e) => {
              setReplyText(e.target.value);
            }}
            type="text"
          />
          <div className="flex gap-4">
            <button
              type="button"
              className="py-1.5 hover:text-[#0f6fec] cursor-pointer"
              onClick={() => {
                addReply(comment.id, replyText);
                setShowReplyBox(false);
                setReplyText('');
              }}
            >
              save
            </button>
            <button
              type="button"
              className="py-1.5 hover:text-[#0f6fec] cursor-pointer"
              onClick={() => {
                setShowReplyBox(false);
                setReplyText('');
              }}
            >
              cancel
            </button>
          </div>
        </>
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
