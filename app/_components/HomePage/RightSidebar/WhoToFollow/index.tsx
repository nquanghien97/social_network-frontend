import React, { useEffect, useState } from 'react';
import WhoToFollowItem from './WhoToFollowItem';
import BaseButton from '../../../common/BaseButton';
import { getSuggestionsUser } from '@/services/user.services';
import { SuggestionsUserEntity } from '@/entities/User.entities';
import NavLink from '../../../common/NavLink';

function WhoToFollow() {
  const [listSuggestionsUser, setListSuggestionsUser] = useState<SuggestionsUserEntity[]>();
  const fetchSuggestionsUser = async () => {
    try {
      const res = await getSuggestionsUser(3);
      setListSuggestionsUser(res.suggesttionsUser);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchSuggestionsUser();
  }, []);
  if (!listSuggestionsUser) return <p>Loading...</p>;
  return (
    <div className="lg:mt-4">
      <div>
        <h5 className="text-xl px-5 pt-5">Who to know</h5>
        {listSuggestionsUser.length === 0 ? (
          <p className="text-center p-5 text-2xl">Tất cả đã là bạn bè của bạn</p>
        ) : (
          <div className="p-5">
            {listSuggestionsUser.map((user: SuggestionsUserEntity) => (
              <WhoToFollowItem key={user.id} fullName={user.fullName} imageUrl={user.imageUrl} job={user.job} friendId={user.id} />
            ))}
            <BaseButton
              className="mt-4 flex"
            >
              <NavLink href="/suggestions-friend">View More</NavLink>
            </BaseButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default WhoToFollow;
