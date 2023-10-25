import FeedBody from './FeedBody';
import FeedHeader from './FeedHeader';
import Comments from './Comments';

interface FeedBodyProps {
  title?: string;
  text?: string;
  imageUrl?: string;
}

function FeedItem(props: FeedBodyProps) {
  const { title, text, imageUrl } = props;
  return (
    <div className="pt-2 pb-4">
      <FeedHeader />
      <FeedBody title={title} text={text} imageUrl={imageUrl} />
      <Comments />
    </div>
  );
}

export default FeedItem;
