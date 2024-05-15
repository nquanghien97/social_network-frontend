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

type Receiver = {
  id: string;
  fullName: string;
  imageUrl: string;
};

type MessageStore = {
  messages: MessageEntity[]; // Map conversationId to messages
  conversations: Record<string, Conversation>; // Map conversationId to conversation details
  addMessage: (message: MessageEntity) => void;
  getMessage: (message: MessageEntity[]) => void;
  setMessage: (message: MessageEntity[]) => void;
  setConversationRead: (conversationId: string, isRead: boolean) => void;
  receiver: Receiver;
  setReceiver: (receiver: Receiver) => void;
};

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  conversations: {},
  receiver: {
    id: '',
    fullName: '',
    imageUrl: '',
  },
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
  setReceiver: (receiver) => {
    set({ receiver });
  },
}));
