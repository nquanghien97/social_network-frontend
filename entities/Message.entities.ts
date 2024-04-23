export interface MessageEntity {
  id: string;
  receiverId: string;
  senderId: string;
  text: string;
  receiver: {
    imageUrl: string;
  },
}
