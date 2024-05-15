export interface CommentEntity {
  id: string;
  content: string;
  userId: string;
  postId: string;
  parentId: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    fullName: string;
    imageUrl: string;
  }
  children: CommentEntity[];
}
