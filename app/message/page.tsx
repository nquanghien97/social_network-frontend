'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import BaseInput from '../_components/common/BaseInput';
import { useAuth } from '@/zustand/auth.store';

const host = 'http://localhost:3000/message';

function Message() {
  const { user } = useAuth();
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState('');
  const [id, setId] = useState();

  useEffect(() => {
    const socket = io(host);
    socket.emit('new User', user.id);
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <BaseInput
        placeholder="type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </div>
  );
}

export default Message;
