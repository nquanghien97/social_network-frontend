export interface PostEntity {
  id: string;
  title?: string;
  text?: string;
  imageUrl?: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
