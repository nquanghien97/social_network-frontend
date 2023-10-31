import FeedBody from './FeedBody';
import FeedHeader from './FeedHeader';
import Comments from './Comments';
import { FeedEntity } from '@/entities/Post.entities';

interface FeedBodyProps {
  post: FeedEntity
}

function FeedItem(props: FeedBodyProps) {
  const { post } = props;
  return (
    <div className="bg-[#0f0f10] border border-[#0f0f10] rounded-md p-5 my-4">
      <FeedHeader fullName={post.author?.fullName} job={post.author?.job} imageUrl={post.author?.imageUrl} updatedAt={post.updatedAt} />
      <FeedBody title={post.title} text={post.text} imageUrl={post.imageUrl} />
      <Comments />
    </div>
  );
}

export default FeedItem;
