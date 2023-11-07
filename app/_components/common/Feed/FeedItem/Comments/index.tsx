import { useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getComments, postComments } from '@/services/comments.services';
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

function Comments(props: CommentsProps) {
  const router = useRouter();
  const { postId, comments, hasFirstComment } = props;
  const [listComments, setListComments] = useState(comments);
  const profile = useSelector((state: RootState) => state.profile);
  const [replyText, setReplyText] = useState('');
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
  const addReply = async ({ content, parentId } : { content: string, parentId?: string }) => {
    try {
      await postComments({ postId, content, parentId });
      await fetchComments();
    } catch (err) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };
  return (
    <>
      <ul className="[&>*]:pl-0">
        {listComments?.map((comment: CommentEntity) => (
          <Comment key={comment.id} comment={comment} addReply={addReply} />
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
            onClick={() => router.push(`/${postId}`)}
          >
            <span className="text-[#b1adb0]">Xem và để lại bình luận</span>
          </div>
        ) : (
          <div className="ml-2 w-full relative [&>div]:mb-0">
            <BaseInput
              onChange={(e) => {
                setReplyText(e.target.value);
              }}
              type="text"
              value={replyText}
              fullWidth
              className="w-full"
              placeholder="Viết bình luận"
              endIcon={(
                <button
                  type="button"
                  className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer absolute right-2 top-0.5"
                  onClick={(e) => {
                    e.preventDefault();
                    addReply({ content: replyText });
                    setReplyText('');
                  }}
                >
                  <SendIcon />
                </button>
              )}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Comments;
