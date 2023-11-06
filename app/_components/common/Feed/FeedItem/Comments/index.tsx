import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getComments, postComments } from '@/services/comments.services';
import Comment from './Comment';
import { CommentEntity } from '@/entities/Comment.entities';

interface CommentsProps {
  // imageUrl?: string;
  postId: string;

}

function Comments(props: CommentsProps) {
  const { postId } = props;
  const [comments, setComments] = useState([]);
  const fetchComments = async () => {
    const res = await getComments({ postId });
    setComments(res.data.comments);
  };
  useEffect(() => {
    fetchComments();
  }, []);
  const addReply = async (parentId: string, content: string) => {
    try {
      await postComments({ postId, parentId, content });
      await fetchComments();
    } catch (err) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };
  console.log(comments);
  return (
    <ul className="[&>*]:pl-0">
      {comments?.map((comment: CommentEntity) => (
        <Comment key={comment.id} comment={comment} addReply={addReply} />
      ))}
    </ul>
  );
}

export default Comments;
