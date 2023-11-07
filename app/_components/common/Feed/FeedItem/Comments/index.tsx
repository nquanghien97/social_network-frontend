import { useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getComments, postComments } from '@/services/comments.services';
import Comment from './Comment';
import { CommentEntity } from '@/entities/Comment.entities';
import BaseInput from '../../../BaseInput';
import SendIcon from '../../../../../_assets/icons/SendIcon';
import { RootState } from '../../../../../../store';

interface CommentsProps {
  // imageUrl?: string;
  postId: string;

}

function Comments(props: CommentsProps) {
  const { postId } = props;
  const [comments, setComments] = useState([]);
  const profile = useSelector((state: RootState) => state.profile);
  const [replyText, setReplyText] = useState('');
  const fetchComments = async () => {
    const res = await getComments({ postId });
    setComments(res.data.comments);
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
        {comments?.map((comment: CommentEntity) => (
          <Comment key={comment.id} comment={comment} addReply={addReply} />
        ))}
      </ul>
      <div className="flex w-full">
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
                onClick={() => {
                  addReply({ content: replyText });
                  setReplyText('');
                }}
              >
                <SendIcon />
              </button>
            )}
          />
        </div>
      </div>
    </>
  );
}

export default Comments;
