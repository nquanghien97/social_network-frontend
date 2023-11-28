'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { getAllPostsAsync, getPostSelector } from '../../store/reducers/postsReducer';
import { AppDispatch } from '../../store';
import Feed from '../_components/common/Feed';
import { getUserId } from '@/services/user.services';
import PostFeed from '../_components/common/PostFeed';
import { PostType } from '../../store/reducers/newFeedReducer';

function Profile() {
  const param = usePathname();
  const userId = param.slice(1, 2);
  // const [posts, setPosts] = useState<FeedEntity[]>([]);
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const currentUserId = getUserId() === Number(userId);

  const { posts, loading } = useSelector(getPostSelector) as PostType;

  useEffect(() => {
    // (async () => {
    //   setLoading(true);
    //   try {
    //     const response = await dispatch(getAllPostsAsync(Number(userId)));
    //     setPosts(response.payload);
    //     setLoading(false);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // })();
    dispatch(getAllPostsAsync(Number(userId)));
  }, [dispatch]);

  if (!posts.length || loading) return <p className="text-center text-xl">Chưa có bài đăng nào!</p>;

  return (
    <div className="lg:container mx-auto w-full">
      {currentUserId && (
        <PostFeed />
      )}
      <Feed posts={posts} loading={loading} />
    </div>
  );
}

export default Profile;
