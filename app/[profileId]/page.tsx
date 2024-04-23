'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Feed from '../_components/common/Feed';
import { getUserId } from '@/services/user.services';
import PostFeed from '../_components/common/PostFeed';
import { usePost } from '@/zustand/posts.store';

function Profile() {
  const param = usePathname();
  const userId = param.slice(1, 2);
  const currentUserId = getUserId() === userId;

  const { posts, loading, getAllPosts } = usePost();

  useEffect(() => {
    (async () => {
      await getAllPosts(+userId);
    })();
  }, []);

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
