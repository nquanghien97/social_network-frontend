'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getPost } from '@/services/post.services';
import FeedItem from '../_components/common/Feed/FeedItem';
import { FeedEntity } from '@/entities/Post.entities';
import LoadingIcon from '../_assets/icons/LoadingIcon';

function Post() {
  const param = usePathname();
  const [post, setPost] = useState<FeedEntity>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await getPost(param.slice(1, param.length));
        setPost(res.data.post);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);
  if (loading && !post) return <div className="w-screen h-screen flex items-center justify-center"><LoadingIcon /></div>;
  return (
    <div className="lg:w-1/2 w-full m-auto max-lg:flex-col pt-14 px-3">
      <FeedItem post={post!} hasFirstComment />
    </div>
  );
}

export default Post;
