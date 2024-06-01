import { create } from 'zustand';
import { isAuthenticated } from '@/utils/isAuthenticated';
import { PostEntity } from '@/entities/Post.entities';
import { getAllPosts } from '@/services/post.services';

interface Auth {
  getAllPosts: (userId: string) => Promise<void>;
  loading: boolean;
  posts: PostEntity[],
  setPost: (post: PostEntity[]) => void
}

export const usePost = create<Auth>()((set) => ({
  loading: false,
  posts: [],
  getAllPosts: async (userId: string) => {
    set(() => ({ loading: true }));
    try {
      if (isAuthenticated()) {
        const response = await getAllPosts(userId);
        set(() => ({ posts: response.data.post as PostEntity[] }));
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      set(() => ({ loading: false }));
    }
  },
  setPost: (posts: PostEntity[]) => {
    set({ posts });
  },
}));
