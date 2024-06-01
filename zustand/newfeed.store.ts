import { create } from 'zustand';
import { isAuthenticated } from '@/utils/isAuthenticated';
import { PostEntity } from '@/entities/Post.entities';
import { getFriendsId } from '@/services/friend.services';
import { getNewFeed } from '@/services/post.services';

interface Auth {
  getNewFeed: ({ limit, offset }: { limit: number, offset: number }) => Promise<void>;
  loading: boolean;
  feeds: PostEntity[],
  setFeeds: (post: PostEntity[]) => void,
  allFeeds: PostEntity[],
  setAllFeeds: (post: PostEntity[]) => void
}

export const useNewFeed = create<Auth>()((set) => ({
  loading: false,
  feeds: [],
  allFeeds: [],
  getNewFeed: async ({ limit, offset }: { limit: number, offset: number }) => {
    set(() => ({ loading: true }));
    try {
      const listFriendsId = await getFriendsId();
      if (isAuthenticated()) {
        const response = await getNewFeed({ listFriendsId, offset, limit });
        set(() => ({ feeds: response.data.posts as PostEntity[] }));
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      set(() => ({ loading: false }));
    }
  },
  setFeeds: (feeds: PostEntity[]) => {
    set({ feeds });
  },
  setAllFeeds: (allFeeds: PostEntity[]) => {
    set({ allFeeds });
  },
}));
