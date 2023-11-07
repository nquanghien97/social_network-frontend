export interface CommentEntity {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: number;
    fullName: string;
    imageUrl: string;
  }
  children: CommentEntity[];
}
