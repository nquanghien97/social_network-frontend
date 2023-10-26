export default interface UserDTO {
  id: number;
  email: string;
  password: string;
  fullName?: string;
  location?: string;
  imageUrl: string;
  description?: string;
  job?: string;
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
