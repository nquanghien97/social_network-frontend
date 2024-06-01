import { useCallback, useEffect, useState } from 'react';
import PostFeed from '@/components/common/PostFeed';
import Feed from '@/components/common/Feed';
import LoadMore from '@/components/common/LoadMore';
import { PostEntity } from '@/entities/Post.entities';
import { useNewFeed } from '@/zustand/newfeed.store';
import Story from './Story';

function CenterSidebar() {
  const {
    loading,
    feeds,
    getNewFeed,
    setAllFeeds,
    allFeeds,
  } = useNewFeed();
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [listPosts, setListPosts] = useState<PostEntity[]>(feeds);
  const {
    measureRef,
    isIntersecting,
    observer,
  } = LoadMore();
  if (!feeds) return <p>loading...</p>;

  useEffect(() => {
    (async () => {
      await getNewFeed({ offset: page, limit: 2 });
    })();
  }, [page]);

  useEffect(() => {
    setCanLoadMore(feeds.length > 0);
    setListPosts((prev) => [...feeds, ...prev]);
  }, [feeds]);

  const loadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  useEffect(() => {
    if (isIntersecting && canLoadMore) {
      loadMore();
      observer?.disconnect();
    }
  }, [isIntersecting, canLoadMore, loadMore]);

  // sort feed
  useEffect(() => {
    const listPostsUnique = [...listPosts]
      .sort((a, b) => (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime())
      .filter((post, index, self) => index === self.findIndex((p) => p.id === post.id));
    setAllFeeds(listPostsUnique);
  }, [listPosts]);
  return (
    <div className="mt-4 flex-1 lg:w-1/2 w-full px-3">
      <div className="flex justify-center items-center flex-col gap-y-2">
        <Story />
        <PostFeed />
        {allFeeds.length > 0 ? (
          <Feed posts={allFeeds} loading={loading} measureRef={measureRef} />
        ) : (
          <h2 className="text-2xl">Chưa có bài viết nào được hiển thị</h2>
        )}
      </div>
    </div>
  );
}

export default CenterSidebar;
