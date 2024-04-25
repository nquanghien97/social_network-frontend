import Image from 'next/image';
import UserEntity from '@/entities/User.entities';
import LoadingIcon from '../../../_assets/icons/LoadingIcon';
import NavLink from '../NavLink';

interface ListFriendsMessageProps {
  loadingFriends: boolean;
  listFriends: UserEntity[];
}

function ListFriendsMessage(props: ListFriendsMessageProps) {
  const { loadingFriends, listFriends } = props;
  return (
    <div>
      {loadingFriends ? (
        <LoadingIcon />
      ) : (
        <ul>
          {listFriends.map((user) => (
            <li
              key={user.id}
            >
              <NavLink
                className="py-2 pl-2 flex items-center gap-2 hover:text-[#0f6fec] duration-300 cursor-pointer rounded-md"
                href={`/${user.id}`}
              >
                <div className="h-12 w-12 shrink-0">
                  <Image
                    src={user.imageUrl || '/DefaultAvatar.svg'}
                    alt={user.fullName || ''}
                    width={48}
                    height={48}
                    className="w-full h-full rounded-full"
                  />
                </div>
                <p>{user.fullName}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListFriendsMessage;
