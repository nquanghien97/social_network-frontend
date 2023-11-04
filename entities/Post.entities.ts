export interface LikeEntity {
  id: string;
  userId: number;
  postId: string;
  createdAt: Date;
}
export interface FeedEntity {
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
  createdAt: Date;
  updatedAt: Date;
}
