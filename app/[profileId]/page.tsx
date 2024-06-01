'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getUserId } from '@/services/user.services';
import Feed from '@/components/common/Feed';
import PostFeed from '@/components/common/PostFeed';
import { usePost } from '@/zustand/posts.store';

function Profile() {
  const param = useParams();
  const userId = param.profileId as string;
  const currentUserId = getUserId() === userId;

  const { posts, loading, getAllPosts } = usePost();

  useEffect(() => {
    (async () => {
      await getAllPosts(userId);
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
