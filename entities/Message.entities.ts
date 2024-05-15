export interface MessageEntity {
  id: string;
  receiverId: string;
  authorId: string;
  text: string;
  author: {
    imageUrl: string;
  }
}
