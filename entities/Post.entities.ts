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
  createdAt: Date;
  updatedAt: Date;
}
