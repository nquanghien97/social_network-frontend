import FeedItem from './FeedItem';
import { FeedEntity } from '@/entities/Post.entities';
import { PostType } from '../../../../store/reducers/postsReducer';
import LoadingIcon from '../../../_assets/icons/LoadingIcon';

interface FeedProps extends PostType {
  hasDeletePost?: boolean;
}

function Feed(props: FeedProps) {
  const {
    posts, loading, hasDeletePost,
  } = props;
  if (loading) {
    return <div className="mt-4 flex items-center justify-center"><LoadingIcon /></div>;
  }
  return (
    <div className="rounded-md w-full">
      {posts?.map((item: FeedEntity) => (
        <FeedItem key={item.id} post={item} hasDeletePost={hasDeletePost} />
      ))}
    </div>
  );
}

export default Feed;
