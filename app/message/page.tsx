'use client';

// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import BaseInput from '../_components/common/BaseInput';
// import { useAuth } from '@/zustand/auth.store';
import MessageIcon from '../_assets/icons/MessageIcon';

// const host = 'http://localhost:3000/message';

function Message() {
  // const { user } = useAuth();
  // const [mess, setMess] = useState([]);
  // const [message, setMessage] = useState('');
  // const [id, setId] = useState();

  // useEffect(() => {
  //   const socket = io(host);
  //   socket.emit('new User', user.id);
  // }, []);

  return (
    <div className="flex items-center justify-center flex-col">
      <MessageIcon fill="#0f6fec" width={100} height={100} />
      <h2>Tin nhắn của bạn</h2>
      <p>Gửi ảnh và tin nhắn riêng tư cho bạn bè</p>
    </div>
  );
}

export default Message;
