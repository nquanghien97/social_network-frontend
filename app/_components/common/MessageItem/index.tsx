import React from 'react';
import BaseInput from '../BaseInput';
import { MessageEntity } from '@/entities/Message.entities';
import { getUserId } from '@/services/user.services';

interface MessageItemProps {
  dataMessages: MessageEntity[];
}

function MessageItem(props: MessageItemProps) {
  const userId = getUserId();
  const { dataMessages } = props;
  console.log(dataMessages);
  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-full">
        <div className="flex flex-col">
          <div className="flex justify-between border-0 border-b-2 border-[#202227] pb-5">
            <div>
              <p>abc</p>
            </div>
            <div>
              <p>icon</p>
            </div>
          </div>
          <div className="flex-1 py-5">
            {dataMessages.map((message) => (
              <div key={message.id} className={`flex ${userId === message.senderId ? 'justify-end' : ''}`}>{`${message.text} & ${message.senderId}`}</div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <BaseInput placeholder="Type a message" />
      </div>
    </div>
  );
}

export default MessageItem;
