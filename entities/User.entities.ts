import UserDTO from '../dto/User.dto';

export default interface UserEntity {
  id: number;
  email: string;
  fullName?: string | null;
  location?: string | null;
  avatar?: string | null;
  description?: string | null;
  job?: string | null;
  createdAt: Date;
}

export const createUserFromUserResponse = (
  userResponse: UserDTO,
): UserEntity => {
  if (!userResponse) throw new Error('Can not create a new User');

  return {
    id: userResponse.id,
    fullName: userResponse.fullName,
    email: userResponse.email,
    location: userResponse.location,
    avatar: userResponse.avatar,
    description: userResponse.description,
    job: userResponse.job,
    createdAt: userResponse.createdAt,
  };
};
