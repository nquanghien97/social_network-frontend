'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getPost } from '@/services/post.services';
import FeedItem from '@/components/common/Feed/FeedItem';
import { PostEntity } from '@/entities/Post.entities';
import LoadingIcon from '@/assets/icons/LoadingIcon';

function Post() {
  const param = usePathname();
  const [post, setPost] = useState<PostEntity>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await getPost(param.slice(7, param.length));
        setPost(res.data.post);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);
  if (loading || !post) return <div className="w-screen h-screen flex items-center justify-center"><LoadingIcon /></div>;
  return (
    <div className="lg:w-1/2 w-full m-auto max-lg:flex-col pt-14 px-3">
      <FeedItem post={post} hasFirstComment />
    </div>
  );
}

export default Post;
