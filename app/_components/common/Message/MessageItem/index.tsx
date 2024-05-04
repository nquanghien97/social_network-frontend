import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import BaseInput from '../../BaseInput';
import SendIcon from '../../../../_assets/icons/SendIcon';
import { getMessages, sendMessage } from '@/services/message.services';
import { MessageEntity } from '@/entities/Message.entities';
import { getUserId } from '@/services/user.services';

interface FormValues {
  message: string;
}

function MessageItem() {
  const params = useParams();
  const userId = getUserId();
  const [messages, setMessages] = useState<MessageEntity[]>([]);
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormValues>();

  useEffect(() => {
    (async () => {
      const res = await getMessages({ limit: 4, offset: 1, conversationId: params.id as string });
      setMessages(res.data.message.messages);
    })();
  }, []);

  const onSubmitSendMessage = async (data: FormValues) => {
    try {
      console.log(data);
      await sendMessage(params.id as string, data.message);
      reset();
    } catch (err) {
      console.log(err.messagge);
    }
  };
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
            {messages.map((message) => (
              (userId === message.authorId) ? (
                <div
                  key={message.id}
                  className="flex justify-end my-2 items-center gap-2"
                >
                  {`${message.text}`}
                  <Image className="rounded-full w-10 h-10" src={message.author.imageUrl || '/DefaultAvatar.svg'} alt={message.author.imageUrl} width={40} height={40} />
                </div>
              ) : (
                <div
                  key={message.id}
                  className="flex my-2 items-center gap-2"
                >
                  <Image className="rounded-full w-10 h-10" src={message.author.imageUrl || '/DefaultAvatar.svg'} alt={message.author.imageUrl} width={40} height={40} />
                  {`${message.text}`}
                </div>
              )
            ))}
          </div>
        </div>
      </div>
      <form
        className="ml-2 relative [&>div]:mb-0 flex-1"
        onSubmit={handleSubmit(onSubmitSendMessage)}
      >
        <BaseInput
          {...register('message')}
          type="text"
          fullWidth
          className="w-full"
          placeholder="Viết bình luận"
          endIcon={(
            <button
              type="submit"
              className="py-1.5 hover:text-[#0f6fec] duration-300 cursor-pointer absolute right-2 top-0.5"
            >
              <SendIcon />
            </button>
          )}
        />
      </form>
    </div>
  );
}

export default MessageItem;
