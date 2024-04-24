import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NavLink from './NavLink';
import UserEntity from '@/entities/User.entities';
import { searchUsers } from '@/services/user.services';
import LoadingIcon from '../../_assets/icons/LoadingIcon';

interface SearchResultProps {
  searchText: string;
}
function SearchResult(props: SearchResultProps) {
  const { searchText } = props;
  const [loadingResultSearch, setLoadingResultSearch] = useState(false);
  const [resultSearch, setResultSearch] = useState<UserEntity[]>([]);

  useEffect(() => {
    (async () => {
      setLoadingResultSearch(true);
      try {
        if (searchText) {
          const res = await searchUsers(searchText);
          setResultSearch(res.users);
          setLoadingResultSearch(false);
        }
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, [searchText]);
  console.log(loadingResultSearch);
  return (
    <ul className="bg-[#0f0f10] absolute z-10 w-full flex flex-col min-w-[15rem] border border-[#ffffff12] rounded-md py-4">
      {loadingResultSearch ? (
        <div className="flex justify-center">
          <LoadingIcon />
        </div>
      ) : (
        <>
          (
          {resultSearch.length > 0 ? resultSearch.map((item) => (
            <li
              key={item.id}
              aria-hidden
              className="flex items-center gap-2 cursor-pointer hover:bg-[#ffffff1a] hover:text-[#0f6fec] px-4 py-2 w-full duration-300"
            >
              <NavLink href={`/${item.id}`}>
                <Image
                  width={40}
                  height={40}
                  src={item.imageUrl || '/DefaultAvatar.svg'}
                  alt={item.fullName || ''}
                  className="rounded"
                />
              </NavLink>
              <p>{item.fullName}</p>
            </li>
          )) : (
            <p className="px-4 py-2">Không có người dùng phù hợp</p>
          )}
          )
        </>
      )}
    </ul>
  );
}

export default SearchResult;
