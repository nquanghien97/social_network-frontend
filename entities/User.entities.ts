import UserDTO from '../dto/User.dto';

export default interface UserEntity {
  id: string;
  email: string;
  fullName?: string;
  location?: string;
  imageUrl: string;
  description?: string;
  job?: string;
  friendQuantity: number;
  createdAt: Date;
  updatedAt: Date;
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
    imageUrl: userResponse.imageUrl,
    description: userResponse.description,
    job: userResponse.job,
    friendQuantity: userResponse.friendQuantity,
    createdAt: userResponse.createdAt,
    updatedAt: userResponse.updatedAt,
  };
};

export interface SuggestionsUserEntity {
  id: string,
  email: string,
  fullName: string,
  location: string,
  job: string,
  imageUrl: string,
  description: string,
  createdAt: Date,
  updatedAt: Date,
}
