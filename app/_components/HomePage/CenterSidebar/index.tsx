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
  const dispatch = useDispatch<AppDispatch>();
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [listPosts, setListPosts] = useState<FeedEntity[]>(posts);
  const [page, setPage] = useState(1);
  const {
    measureRef,
    isIntersecting,
    observer,
  } = LoadMore();

  useEffect(() => {
    (async () => {
      const listFriendsId = await getFriendsId();
      const res = await getNewFeed({ listFriendsId: listFriendsId.listFriendsId, offset: page, limit: 1 });
      dispatch(setPosts(res.data.posts));
    })();
  }, [dispatch, page]);

  useEffect(() => {
    setCanLoadMore(posts.length > 0);
    setListPosts((prev) => Array.from(new Set([...prev, ...posts])));
  }, [posts]);

  const loadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);
  console.log({ listPosts, posts });

  useEffect(() => {
    if (isIntersecting && canLoadMore) {
      loadMore();
      observer?.disconnect();
    }
  }, [isIntersecting, canLoadMore, loadMore]);

  return (
    <div className="mt-4 flex-1 lg:w-1/2 w-full px-3">
      <div className="flex justify-center items-center flex-col gap-y-2">
        <Story />
        <PostFeed />
        <Feed posts={listPosts} loading={false} measureRef={measureRef} />
      </div>
    </div>
  );
}

export default CenterSidebar;
