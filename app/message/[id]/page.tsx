'use client';

import { useEffect, useState } from 'react';
import MessageItem from '../../_components/common/MessageItem';
import { getMessages } from '@/services/message.services';
import { MessageEntity } from '@/entities/Message.entities';

function MessagePage() {
  const [messages, setMessages] = useState<MessageEntity[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getMessages({ limit: 4, offset: 1, conversationId: '59f29297-3342-4f01-9c73-223be01fb3b9' });
      setMessages(res.data.message.messages);
    })();
  }, []);

  return (
    <MessageItem dataMessages={messages} />
  );
}

export default MessagePage;
