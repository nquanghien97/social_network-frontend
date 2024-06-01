import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import UserEntity from '@/entities/User.entities';
import LoadingIcon from '@/assets/icons/LoadingIcon';
import { conversationServices } from '@/services/message.services';
import { getUserId } from '@/services/user.services';

interface ListFriendsMessageProps {
  loadingFriends: boolean;
  listFriends: UserEntity[];
  setOpenMessage: Dispatch<SetStateAction<boolean>>;
  receiverId?: string;
}

function ListFriendsMessage(props: ListFriendsMessageProps) {
  const {
    loadingFriends, listFriends, setOpenMessage, receiverId,
  } = props;
  const router = useRouter();
  const userId = getUserId();

  const onClickUser = async (id: string) => {
    const res = await conversationServices({ senderId: userId, receiverId: id });
    router.push(`/message/${res.data.conversation.id}`);
    setOpenMessage(false);
  };
  return (
    <div>
      {loadingFriends ? (
        <LoadingIcon />
      ) : (
        <ul>
          {listFriends.map((user) => (
            <li
              key={user.id}
              onClick={() => onClickUser(user.id)}
              aria-hidden
              className={`flex gap-2 items-center p-2 my-2 cursor-pointer hover:bg-[#0f6fec] duration-300 rounded-md ${user.id === receiverId ? 'bg-[#0f6fec]' : ''}`}
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListFriendsMessage;
