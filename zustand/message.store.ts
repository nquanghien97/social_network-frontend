import { create } from 'zustand';
import { MessageEntity } from '@/entities/Message.entities';

type Message = {
  id: string;
  message: string;
  authorId: string;
  createdAt: string;
  isEdited: boolean;
};

type Conversation = {
  id: string;
  lastMessageSent: Message;
  isRead: boolean;
};

type MessageStore = {
  messages: MessageEntity[]; // Map conversationId to messages
  conversations: Record<string, Conversation>; // Map conversationId to conversation details
  addMessage: (message: MessageEntity) => void;
  getMessage: (message: MessageEntity[]) => void;
  setMessage: (message: MessageEntity[]) => void;
  setConversationRead: (conversationId: string, isRead: boolean) => void;
  receiverId: string;
  setReceiverId: (receiverId: string) => void;
};

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  conversations: {},
  receiverId: '',
  getMessage: (message) => set((state) => ({
    messages: [
      ...state.messages,
      ...message,
    ],
  })),
  addMessage: (message) => set((state) => ({
    messages: [
      ...state.messages,
      message,
    ],
  })),
  setMessage: (message: MessageEntity[]) => set(() => ({
    messages: message,
  })),
  setConversationRead: (conversationId, isRead) => set((state) => ({
    conversations: {
      ...state.conversations,
      [conversationId]: {
        ...state.conversations[conversationId],
        isRead,
      },
    },
  })),
  setReceiverId: (receiverId) => {
    set({ receiverId });
  },
}));
