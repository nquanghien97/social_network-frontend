'use client';

import React, { useCallback, useEffect, useState } from 'react';
import SuggestionsFriendItem from './SuggestionsFriendItem';
import { SuggestionsUserEntity } from '@/entities/User.entities';
import { getSuggestionsUser } from '@/services/user.services';
import LoadMore from '../_components/common/LoadMore';
import LoadingIcon from '../_assets/icons/LoadingIcon';

function SuggestionsFriend() {
  const [listSuggestionsUser, setListSuggestionsUser] = useState<SuggestionsUserEntity[]>([]);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { measureRef, isIntersecting, observer } = LoadMore();

  useEffect(() => {
    (async () => {
      const { suggesttionsUser } = await getSuggestionsUser(2, page);
      setListSuggestionsUser((prev) => [...prev, ...suggesttionsUser]);
      setCanLoadMore(suggesttionsUser.length > 0);
      setLoading(false);
    })();
  }, [page]);

  const loadMore = useCallback(() => {
    setPage((p) => p + 1);
    setLoading(true);
  }, []);

  useEffect(() => {
    if (isIntersecting && canLoadMore) {
      loadMore();
      observer?.disconnect();
    }
  }, [isIntersecting, canLoadMore, loadMore]);
  return (
    <div className="pt-14 p-6">
      <h1 className="text-2xl my-5">Những người bạn có thể biết</h1>
      <div className="flex flex-wrap gap-4 sm:justify-start justify-center">
        {listSuggestionsUser.map((user) => (
          <SuggestionsFriendItem key={user.id} measureRef={measureRef} imageUrl={user.imageUrl} fullName={user.fullName} />
        ))}
      </div>
      {loading ? <LoadingIcon /> : null}
    </div>
  );
}

export default SuggestionsFriend;
