import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Story from './Story';
import PostFeed from '../../common/PostFeed';
import Feed from '../../common/Feed';
import { AppDispatch } from '../../../../store';
import { PostType, getAllPostsAsync, getPostSelector } from '../../../../store/reducers/postsReducer';

function CenterSidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading } = useSelector(getPostSelector) as PostType;
  useEffect(() => {
    dispatch(getAllPostsAsync());
  }, [dispatch]);
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
