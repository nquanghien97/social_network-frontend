import Image from 'next/image';

interface UserAvatarProps {
  imageUrl: string;
}

function UserAvatar(props: UserAvatarProps) {
  const { imageUrl } = props;
  return (
    <div>
      <Image src={imageUrl || '/DefaultAvatar.svg'} width={48} height={48} alt="" unoptimized className="w-full h-full rounded-full cursor-pointer" />
    </div>
  );
}

export default UserAvatar;
