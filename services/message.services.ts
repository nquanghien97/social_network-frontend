import api from '../config/api';

export function getMessages({ conversationId, limit, offset } : { conversationId: string, limit: number, offset: number }) {
  return api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`, { conversationId, limit, offset });
}

export function conversationServices({ senderId, receiverId } : { senderId: string, receiverId: string }) {
  return api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/conversation`, { senderId, receiverId });
}

export function sendMessage(conversationId: string, text: string) {
  return api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/send-messages`, { conversationId, text });
}
