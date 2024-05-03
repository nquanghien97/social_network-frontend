'use client';

import MessageItem from '../../_components/common/Message/MessageItem';

function MessagePage() {
  // useEffect(() => {
  //   (async () => {
  //     const res = await getMessages({ limit: 4, offset: 1, conversationId: '59f29297-3342-4f01-9c73-223be01fb3b9' });
  //     setMessages(res.data.message.messages);
  //   })();
  // }, []);

  return (
    <MessageItem />
  );
}

export default MessagePage;
