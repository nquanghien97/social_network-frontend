import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import FeedItem from './FeedItem';
import { PostEntity } from '@/entities/Post.entities';
import { AppDispatch } from '../../../../../store';
import { PostType, getAllPostsAsync, getPostSelector } from '../../../../../store/reducers/postsReducer';
import LoadingIcon from '../../../../_assets/icons/LoadingIcon';

function Feed() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading } = useSelector(getPostSelector) as PostType;
  useEffect(() => {
    dispatch(getAllPostsAsync());
  }, [dispatch]);
  if (loading) {
    return <div className="mt-4 flex items-center justify-center"><LoadingIcon /></div>;
  }
  return (
    <div className="rounded-md w-full">
      {posts?.map((item: PostEntity) => (
        <FeedItem key={item.id} post={item} />
      ))}
    </div>
  );
}

export default Feed;
