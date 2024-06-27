'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getUserId } from '@/services/user.services';
import Feed from '@/components/common/Feed';
import PostFeed from '@/components/common/PostFeed';
import { usePost } from '@/zustand/posts.store';

function Profile() {
  const param = useParams();
  const userId = param.profileId as string;
  const currentUserId = getUserId() === userId;
  const limit = 3;
  const [page, setPage] = useState(1);

  const {
    posts, loading, getAllPosts, canLoadMore,
  } = usePost();

  const loadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  useEffect(() => {
    (async () => {
      await getAllPosts({ limit, offset: page });
    })();
  }, []);

  const fetchNextPosts = async () => {
    if (canLoadMore) {
      loadMore();
      await getAllPosts({ limit, offset: page });
    }
  };
  console.log(page);

  if (!posts.length || loading) return <p className="text-center text-xl">Chưa có bài đăng nào!</p>;

  return (
    <div className="lg:container mx-auto w-full">
      {currentUserId && (
        <PostFeed />
      )}
      <Feed posts={posts} fetchNextPosts={fetchNextPosts} loading={loading} />
    </div>
  );
}

export default Profile;
