'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Feed from '../_components/common/Feed';
import PostFeed from '../_components/common/PostFeed';
import { AppDispatch } from '../../store';
import { PostType, getAllPostsAsync, getPostSelector } from '../../store/reducers/postsReducer';

function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading } = useSelector(getPostSelector) as PostType;
  useEffect(() => {
    dispatch(getAllPostsAsync());
  }, [dispatch]);
  return (
    <div className="lg:container mx-auto w-full">
      <PostFeed />
      <Feed posts={posts} loading={loading} hasDeletePost />
    </div>
  );
}

export default Profile;
