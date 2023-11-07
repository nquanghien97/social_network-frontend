// export interface CommentEntity {
//   id: string;
//   content: string;
//   createdAt: Date;
//   updatedAt: Date;
//   author: {
//     id: number;
//     fullName: string;
//     imageUrl: string;
//   }
//   children: CommentEntity[];
// }
export interface CommentEntity {
  id: string;
  content: string;
  userId: number;
  postId: string;
  parentId: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: number;
    fullName: string;
    imageUrl: string;
  }
  children: CommentEntity[];
}
