import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import UserEntity from '@/entities/User.entities';
import { searchUsers } from '@/services/user.services';
import LoadingIcon from '@/assets/icons/LoadingIcon';
import NavLink from './NavLink';

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
  return (
    <ul className="bg-[#0f0f10] absolute z-10 w-full flex flex-col min-w-[15rem] border border-[#ffffff12] rounded-md py-4">
      {loadingResultSearch ? (
        <div className="flex justify-center">
          <LoadingIcon />
        </div>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {resultSearch.length > 0 ? resultSearch.map((item) => (
            <li
              key={item.id}
            >
              <NavLink
                href={`/${item.id}`}
                className="flex items-center gap-2 cursor-pointer hover:bg-[#ffffff1a] hover:text-[#0f6fec] px-4 py-2 w-full duration-300"
              >
                <Image
                  width={40}
                  height={40}
                  src={item.imageUrl || '/DefaultAvatar.svg'}
                  alt={item.fullName || ''}
                  className="rounded"
                />
                <p>{item.fullName}</p>
              </NavLink>
            </li>
          )) : (
            <p className="px-4 py-2">Không có người dùng phù hợp</p>
          )}
        </>
      )}
    </ul>
  );
}

export default SearchResult;
