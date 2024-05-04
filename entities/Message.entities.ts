export interface MessageEntity {
  id: string;
  receiverId: string;
  authorId: string;
  text: string;
  receiver: {
    imageUrl: string;
  },
  author: {
    imageUrl: string;
  }
}
