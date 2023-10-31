import FeedItem from './FeedItem';
import { FeedEntity } from '@/entities/Post.entities';
import { PostType } from '../../../../store/reducers/postsReducer';
import LoadingIcon from '../../../_assets/icons/LoadingIcon';

function Feed(props: PostType) {
  const { posts, loading } = props;
  if (loading) {
    return <div className="mt-4 flex items-center justify-center"><LoadingIcon /></div>;
  }
  return (
    <div className="rounded-md w-full">
      {posts?.map((item: FeedEntity) => (
        <FeedItem key={item.id} post={item} />
      ))}
    </div>
  );
}

export default Feed;
