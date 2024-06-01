'use client';

import MessageIcon from '@/assets/icons/MessageIcon';

function Message() {
  return (
    <div className="flex items-center justify-center flex-col">
      <MessageIcon fill="#0f6fec" width={100} height={100} />
      <h2>Tin nhắn của bạn</h2>
      <p>Gửi ảnh và tin nhắn riêng tư cho bạn bè</p>
    </div>
  );
}

export default Message;
