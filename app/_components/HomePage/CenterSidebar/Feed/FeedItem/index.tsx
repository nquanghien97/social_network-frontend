import FeedBody from './FeedBody';
import FeedHeader from './FeedHeader';
import Comments from './Comments';

function FeedItem() {
  return (
    <div className="py-5">
      <FeedHeader />
      <FeedBody />
      <Comments />
    </div>
  );
}

export default FeedItem;
