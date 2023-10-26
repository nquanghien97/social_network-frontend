import { useSelector } from 'react-redux';
import FeedBody from './FeedBody';
import FeedHeader from './FeedHeader';
import Comments from './Comments';
import { PostEntity } from '@/entities/Post.entities';
import { RootState } from '../../../../../../store';

interface FeedBodyProps {
  post: PostEntity
}

function FeedItem(props: FeedBodyProps) {
  const { post } = props;
  const profile = useSelector((state: RootState) => state.profile);
  return (
    <div className="pt-2 pb-4">
      <FeedHeader fullName={profile.fullName} job={profile.job} imageUrl={profile.imageUrl} updatedAt={profile.updatedAt} />
      <FeedBody title={post.title} text={post.text} imageUrl={post.imageUrl} />
      <Comments />
    </div>
  );
}

export default FeedItem;
