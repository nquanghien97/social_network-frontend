export default interface UserDTO {
  id: number;
  email: string;
  password: string;
  fullName?: string | null;
  location?: string | null;
  avatar?: string | null;
  description?: string | null;
  accessToken: string,
  refreshToken?: string,
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserDTO {
  fullName?: string;
  location?: string;
  description?: string;
}
