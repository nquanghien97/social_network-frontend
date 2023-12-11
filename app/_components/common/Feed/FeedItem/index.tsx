import FeedBody from './FeedBody';
import FeedHeader from './FeedHeader';
import Comments from './Comments';
import { FeedEntity } from '@/entities/Post.entities';

interface FeedBodyProps {
  post: FeedEntity
  hasFirstComment?: boolean
  measureRef: (node: HTMLDivElement) => void;
}

function FeedItem(props: FeedBodyProps) {
  const {
    post,
    hasFirstComment,
    measureRef,
  } = props;
  return (
    <div className="bg-[#0f0f10] border border-[#0f0f10] rounded-md p-5 my-4" ref={measureRef}>
      <FeedHeader
        fullName={post.author?.fullName}
        job={post.author?.job}
        imageUrl={post.author?.imageUrl}
        updatedAt={post.updatedAt}
        postId={post.id}
        authorId={post.author.id}
      />
      <FeedBody title={post.title} text={post.text} imageUrl={post.imageUrl} postId={post.id} liked={post.like} />
      <Comments postId={post.id} comments={post.comments} hasFirstComment={hasFirstComment} />
    </div>
  );
}

export default FeedItem;
