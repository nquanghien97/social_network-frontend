import api from '../config/api';

export function likePost({ postId }: { postId: string }) {
  return api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/like`, { postId });
}
