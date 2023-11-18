import FeedItem from './FeedItem';
import { FeedEntity } from '@/entities/Post.entities';
import { PostType } from '../../../../store/reducers/postsReducer';
import LoadingIcon from '../../../_assets/icons/LoadingIcon';

interface FeedProps extends PostType {
  // measureRef: (node: HTMLDivElement) => void;
}
function Feed(props: FeedProps) {
  const {
    posts,
    loading,
    // measureRef,
  } = props;
  if (loading || !posts) {
    return <div className="mt-4 flex items-center justify-center"><LoadingIcon /></div>;
  }
  return (
    <div className="rounded-md w-full">
      {posts.map((item: FeedEntity) => (
        <FeedItem key={item.id} post={item} hasFirstComment={false} />
      ))}
    </div>
  );
}

export default Feed;
