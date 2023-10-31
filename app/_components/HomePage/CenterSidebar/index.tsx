import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Story from './Story';
import PostFeed from '../../common/PostFeed';
import Feed from '../../common/Feed';
import { getFriendsId } from '@/services/friend.services';
import { getNewFeed } from '@/services/post.services';

function CenterSidebar() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchNewFeed = async () => {
      try {
        const listFriendsId = await getFriendsId();
        const res = await getNewFeed({ listFriendsId: listFriendsId.listFriendsId });
        setPosts(res.data.posts);
      } catch (err) {
        toast.error('Có lỗi xảy ra, vui lòng thử lại');
      } finally {
        setLoading(false);
      }
    };
    fetchNewFeed();
  }, []);
  return (
    <div className="mt-4 flex-1 lg:w-1/2 w-full px-3">
      <div className="flex justify-center items-center flex-col gap-y-2">
        <Story />
        <PostFeed />
        <Feed posts={posts} loading={loading} />
      </div>
    </div>
  );
}

export default CenterSidebar;
