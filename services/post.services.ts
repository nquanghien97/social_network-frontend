import api from '../app/_config/api';

interface ListFriendsType {
  listFriendsId: number[];
  limit: number;
  offset: number;
}

export const createPost = (data: FormData) => api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, data);

export const getAllPosts = (userId: number) => api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, { userId });

export const deletePost = (data: { postId: string }) => api.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, { data });

export const getNewFeed = (data: ListFriendsType) => api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/feed`, data);

export const getPost = (postId: string) => api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${postId}`);
