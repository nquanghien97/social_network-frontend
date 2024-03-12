import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import Story from './Story';
import PostFeed from '../../common/PostFeed';
import Feed from '../../common/Feed';
import { AppDispatch, RootState } from '../../../../store';
import {
  setPosts,
} from '../../../../store/reducers/newFeedReducer';
import LoadMore from '../../common/LoadMore';
import { FeedEntity } from '@/entities/Post.entities';
import { getNewFeed } from '@/services/post.services';
import { getFriendsId } from '@/services/friend.services';

function CenterSidebar() {
  const posts = useSelector((state: RootState) => state.newfeed.posts);
  const deletedPost = useSelector((state: RootState) => state.newfeed.deletedPost);
  const dispatch = useDispatch<AppDispatch>();
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [listPosts, setListPosts] = useState<FeedEntity[]>(posts);
  const [page, setPage] = useState(1);
  const [friendsId, setFriendsId] = useState();
  const {
    measureRef,
    isIntersecting,
    observer,
  } = LoadMore();

  useEffect(() => {
    (async () => {
      const listFriendsId = await getFriendsId();
      setFriendsId(listFriendsId.listFriendsId);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (friendsId) {
        const res = await getNewFeed({ listFriendsId: friendsId, offset: page, limit: 2 });
        dispatch(setPosts(res.data.posts));
      }
    })();
  }, [dispatch, page, friendsId]);

  useEffect(() => {
    setCanLoadMore(posts.length > 0);
    setListPosts((prev) => [...prev, ...posts]);
  }, [posts]);

  const loadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  useEffect(() => {
    if (isIntersecting && canLoadMore) {
      loadMore();
      observer?.disconnect();
    }
  }, [isIntersecting, canLoadMore, loadMore]);

  // sort feed
  const listPostsUnique = [...listPosts]
    .sort((a, b) => (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime())
    .filter((post, index, self) => index === self.findIndex((p) => p.id === post.id))
    .filter((post) => post.id !== deletedPost?.id);
  return (
    <div className="mt-4 flex-1 lg:w-1/2 w-full px-3">
      <div className="flex justify-center items-center flex-col gap-y-2">
        <Story />
        <PostFeed />
        <Feed posts={listPostsUnique} loading={false} measureRef={measureRef} />
      </div>
    </div>
  );
}

export default CenterSidebar;
