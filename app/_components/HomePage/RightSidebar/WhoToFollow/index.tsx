import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import WhoToFollowItem from './WhoToFollowItem';
import BaseButton from '../../../common/BaseButton';
import { getSuggestionsUser } from '@/services/user.services';
import { SuggestionsUserEntity } from '@/entities/User.entities';

function WhoToFollow() {
  const [listSuggestionsUser, setListSuggestionsUser] = useState<SuggestionsUserEntity[]>();
  useEffect(() => {
    const fetchSuggestionsUser = async () => {
      const res = await getSuggestionsUser();
      setListSuggestionsUser(res);
    };
    fetchSuggestionsUser();
  }, []);
  if (!listSuggestionsUser) return <p>Loading...</p>;
  return (
    <div className="lg:mt-4">
      <div>
        <h5 className="text-xl px-5 pt-5">Who to follow</h5>
        <div className="p-5">
          {listSuggestionsUser.map((user: SuggestionsUserEntity) => (
            <WhoToFollowItem fullName={user.fullName} imageUrl={user.imageUrl} job={user.job} />
          ))}
          <BaseButton
            className="mt-4 flex"
          >
            <Link scroll={false} href="/" className="">View More</Link>
          </BaseButton>
        </div>
      </div>
    </div>
  );
}

export default WhoToFollow;
