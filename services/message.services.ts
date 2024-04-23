import api from '../config/api';

export function getMessages({ conversationId, limit, offset } : { conversationId: string, limit: number, offset: number }) {
  return api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`, { conversationId, limit, offset });
}
