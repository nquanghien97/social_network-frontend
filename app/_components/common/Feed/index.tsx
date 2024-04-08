import FeedItem from './FeedItem';
import { PostEntity } from '@/entities/Post.entities';
import LoadingIcon from '../../../_assets/icons/LoadingIcon';

interface FeedProps {
  measureRef?: (node: HTMLDivElement) => void;
  posts: PostEntity[];
  loading: boolean;
}
function Feed(props: FeedProps) {
  const {
    posts,
    loading,
    measureRef,
  } = props;
  if (loading || !posts) {
    return <div className="mt-4 flex items-center justify-center"><LoadingIcon /></div>;
  }
  return (
    <div className="rounded-md w-full">
      {posts.map((item: PostEntity) => (
        <FeedItem key={item.id} post={item} hasFirstComment={false} measureRef={measureRef} />
      ))}
    </div>
  );
}

export default Feed;
