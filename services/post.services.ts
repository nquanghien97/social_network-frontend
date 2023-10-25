import { PostDTO } from '@/dto/Post.dto';
import api from '../app/_config/api';

export const createPost = (data: PostDTO) => api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, data);

export const getAllPosts = () => api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post`);
