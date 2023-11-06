import api from '../app/_config/api';

export const getComments = ({ postId }: { postId: string }) => api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/get-comments`, { postId });

interface DataPostComments {
  postId: string,
  content: string,
  parentId: string
}
export const postComments = ({ postId, content, parentId } : DataPostComments) => api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, { postId, content, parentId });
