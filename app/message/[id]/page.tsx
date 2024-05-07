'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { io } from 'socket.io-client';
import { useAuth } from '@/zustand/auth.store';
import MessageItem from '../../_components/common/Message/MessageItem';
import { useSocketStore } from '@/zustand/socket.store';
import { useMessageStore } from '@/zustand/message.store';

function MessagePage() {
  const { user } = useAuth();
  const pathname = usePathname();
  const { setSocket, setOnlineUserIds } = useSocketStore();
  const { addMessage, setConversationRead, setMessage } = useMessageStore();

  const pathnameRef = useRef<string>(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (user) {
      const newSocket = io(process.env.NEXT_PUBLIC_API_URL as string, {
        query: { id: user.id.toString() },
      });
      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
    return undefined;
  }, [user, setSocket]);

  useEffect(() => {
    const { socket } = useSocketStore.getState();

    socket?.on('online-users', (userIds) => {
      setOnlineUserIds(userIds);
    });

    socket?.on('user-connected', (userId) => {
      setOnlineUserIds((prevUserIds: string[]) => [...prevUserIds, ...userId]);
    });

    socket?.on('user-disconnected', (userId) => {
      setOnlineUserIds((prevUserIds: string[]) => prevUserIds.filter((id) => id !== userId));
    });

    socket?.on('receive-message', (receivedMessage) => {
      const {
        conversationId,
        message,
      } = receivedMessage;
      console.log(message);

      // Add message to messages store
      addMessage(message);

      // Mark conversation as unread if not viewing
      const isViewingConversation = pathnameRef.current === `/${conversationId}`;
      if (!isViewingConversation) {
        setConversationRead(conversationId, false);
      }
    });

    return () => {
      socket?.off('user-connected');
      socket?.off('user-disconnected');
      setMessage([]);
    };
  }, [setOnlineUserIds, addMessage, setConversationRead]);
  return (
    <MessageItem />
  );
}

export default MessagePage;
