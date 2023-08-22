import FeedBody from './FeedBody';
import FeedHeader from './FeedHeader';
import Comment from './Comment';

function FeedItem() {
  return (
    <div>
      <FeedHeader />
      <FeedBody />
      <Comment />
    </div>
  );
}

export default FeedItem;
