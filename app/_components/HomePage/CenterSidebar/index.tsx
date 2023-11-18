import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Story from './Story';
import PostFeed from '../../common/PostFeed';
import Feed from '../../common/Feed';
import { AppDispatch } from '../../../../store';
import { PostType, getNewFeedAsync, getNewFeedSelector } from '../../../../store/reducers/newFeedReducer';
// import LoadMore from '../../common/LoadMore';
// import { FeedEntity } from '@/entities/Post.entities';

function CenterSidebar() {
  const dispatch = useDispatch<AppDispatch>();
  // const [canLoadMore, setCanLoadMore] = useState(false);
  // const [listPosts, setListPosts] = useState<FeedEntity[]>([]);
  // const [page, setPage] = useState(1);
  // const {
  //   // measureRef,
  //   isIntersecting,
  //   observer,
  // } = LoadMore();

  const { posts, loading } = useSelector(getNewFeedSelector) as PostType;
  useEffect(() => {
    (async () => {
      await dispatch(getNewFeedAsync({ limit: 2, offset: 0 }));
    })();
  }, [dispatch]);

  // useEffect(() => {
  //   setCanLoadMore(posts.length > 0);
  //   setListPosts((prev) => [...prev, ...posts]);
  // }, [posts]);

  // const loadMore = useCallback(() => {
  //   setPage((p) => p + 1);
  // }, []);

  // console.log({ posts, listPosts });

  // useEffect(() => {
  //   if (isIntersecting && canLoadMore) {
  //     loadMore();
  //     observer?.disconnect();
  //   }
  // }, [isIntersecting, canLoadMore, loadMore]);
  return (
    <div className="mt-4 flex-1 lg:w-1/2 w-full px-3">
      <div className="flex justify-center items-center flex-col gap-y-2">
        <Story />
        <PostFeed />
        <Feed posts={posts} loading={loading} />
      </div>
    </div>
  );
}

export default CenterSidebar;
