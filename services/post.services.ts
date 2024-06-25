import api from '@/config/api';

interface ListFriendsType {
  listFriendsId?: string[];
  limit: number;
  offset: number;
}

export const createPost = (data: FormData) => api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, data);

export const getAllPosts = ({ limit, offset } : { limit: number, offset: number }) => api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, { limit, offset });

export const deletePost = (data: { postId: string }) => api.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, { data });

export const getNewFeed = (data: ListFriendsType) => api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/feed`, data);

export const getPost = (postId: string) => api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${postId}`);

export const getImagePosts = (userId: string) => api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/photos`, { userId });

export const updatePost = (data: FormData, postId: string) => api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/update-post/${postId}`, data);
