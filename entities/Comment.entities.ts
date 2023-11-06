export interface CommentEntity {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: number;
    fullName: string;
    imageUrl: string;
  }
  children: CommentEntity[];
}
