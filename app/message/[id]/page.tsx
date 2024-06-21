'use client';

import { useEffect, useRef } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { io } from 'socket.io-client';
import { useAuth } from '@/zustand/auth.store';
import { useSocketStore } from '@/zustand/socket.store';
import { useMessageStore } from '@/zustand/message.store';
import MessageItem from '@/components/common/Message/MessageItem';

function MessagePage() {
  const { user } = useAuth();
  const pathname = usePathname();
  const { id: currentConversationId } = useParams();
  const { setSocket, setOnlineUserIds, socket } = useSocketStore();
  const { addMessage, setConversationRead, setEmptyMessage } = useMessageStore();

  const pathnameRef = useRef<string>(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (user) {
      const newSocket = io(process.env.NEXT_PUBLIC_API_URL as string, {
        query: { id: currentConversationId },
      });
      setSocket(newSocket);
      return () => {
        newSocket.close();
      };
    }
    return undefined;
  }, [user]);

  useEffect(() => {
    if (!socket) return;
    socket.on('online-users', (userIds) => {
      setOnlineUserIds(userIds);
    });

    socket.on('user-disconnected', (userId) => {
      setOnlineUserIds((prevUserIds: string[]) => prevUserIds.filter((id) => id !== userId));
    });

    socket.on('receive-message', async (receivedMessage) => {
      const {
        id,
        receiverId,
        authorId,
        text,
        conversationId,
        author,
      } = receivedMessage;
      // Add message to messages store
      addMessage({
        id,
        receiverId,
        authorId,
        text,
        author: {
          imageUrl: author.imageUrl,
        },
      });

      // Mark conversation as unread if not viewing
      const isViewingConversation = pathnameRef.current === `/${conversationId}`;
      if (!isViewingConversation) {
        setConversationRead(conversationId, false);
      }
    });

    // eslint-disable-next-line consistent-return
    return () => {
      socket.off('user-connected');
      socket.off('user-disconnected');
      setEmptyMessage();
    };
  }, [socket]);
  return (
    <MessageItem />
  );
}

export default MessagePage;
