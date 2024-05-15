import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageEntity } from '@/entities/Message.entities';
import api from '../config/api';
import { useSocketStore } from '@/zustand/socket.store';
import { useMessageStore } from '@/zustand/message.store';

export const useGetMessages = (conversationId: number) => {
  const [messages, setMessages] = useState<MessageEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`, {
          params: { conversationId },
        });
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [conversationId]);

  return { data: messages, isLoading };
};

export const useSendMessage = (
  conversationId: string,
  text: string,
  receiverId: string,
) => {
  const { socket } = useSocketStore();
  const pathname = usePathname();
  const pathnameRef = useRef<string>(pathname);
  const [isLoading, setIsLoading] = useState(false);
  const { addMessage } = useMessageStore();

  useEffect(() => {
    pathnameRef.current = pathname;
  }, []);

  const sendMessage = async () => {
    setIsLoading(true);
    try {
      if (text) {
        const res = await api.post('/api/send-messages', {
          conversationId,
          text,
        });
        const { data } = res;
        socket?.emit('send-message', {
          id: data.id,
          authorId: data.authorId,
          conversationId,
          receiverId,
          text: data.text,
          author: {
            imageUrl: data.author.imageUrl,
            id: data.author.id,
          },
          timeSent: data.createdAt,
        });
        addMessage(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading };
};
