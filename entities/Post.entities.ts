import { CommentEntity } from './Comment.entities';

export interface LikeEntity {
  id: string;
  userId: number;
  postId: string;
  createdAt: Date;
}

export interface PostEntity {
  id: string;
  title?: string;
  text?: string;
  imageUrl: string;
  author: {
    id: number;
    fullName: string;
    job: string;
    imageUrl: string;
  }
  like: LikeEntity[];
  comments: CommentEntity[];
  createdAt: Date;
  updatedAt: Date;
  _count: {
    like: number;
    comments: number
  }
}
