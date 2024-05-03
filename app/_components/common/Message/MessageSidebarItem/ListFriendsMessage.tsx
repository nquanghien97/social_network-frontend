import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import UserEntity from '@/entities/User.entities';
import LoadingIcon from '../../../../_assets/icons/LoadingIcon';
import { conversationServices } from '@/services/message.services';
import { getUserId } from '@/services/user.services';

interface ListFriendsMessageProps {
  loadingFriends: boolean;
  listFriends: UserEntity[];
  setOpenMessage: Dispatch<SetStateAction<boolean>>
}

function ListFriendsMessage(props: ListFriendsMessageProps) {
  const { loadingFriends, listFriends, setOpenMessage } = props;
  const router = useRouter();
  const userId = getUserId();

  const onClickUser = async (receiverId: string) => {
    const res = await conversationServices({ senderId: userId, receiverId });
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
              className="flex gap-2 items-center p-2 my-2 cursor-pointer hover:bg-[#ccc] duration-300 rounded-md"
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
