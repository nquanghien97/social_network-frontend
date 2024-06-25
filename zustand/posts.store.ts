import { create } from 'zustand';
import { isAuthenticated } from '@/utils/isAuthenticated';
import { PostEntity } from '@/entities/Post.entities';
import { getAllPosts } from '@/services/post.services';

interface Auth {
  getAllPosts: ({ limit, offset } : { limit: number, offset: number }) => Promise<void>;
  loading: boolean;
  posts: PostEntity[],
  setPost: (post: PostEntity[]) => void
}

export const usePost = create<Auth>()((set) => ({
  loading: false,
  posts: [],
  getAllPosts: async ({ limit, offset } : { limit: number, offset: number }) => {
    set(() => ({ loading: true }));
    try {
      if (isAuthenticated()) {
        const response = await getAllPosts({ limit, offset });
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
  updatePost: (updatedPost: PostEntity) => {
    set((state) => ({
      posts: state.posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    }));
  },
}));
