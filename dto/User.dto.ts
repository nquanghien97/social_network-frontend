export default interface UserDTO {
  id: string;
  email: string;
  password: string;
  fullName?: string;
  location?: string;
  imageUrl: string;
  description?: string;
  job?: string;
  friendQuantity: number;
  accessToken: string,
  refreshToken?: string,
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserDTO {
  fullName?: string;
  location?: string;
  description?: string;
  job?: string;
}
