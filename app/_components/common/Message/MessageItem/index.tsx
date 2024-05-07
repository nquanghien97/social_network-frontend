import {
  useEffect, useRef,
} from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import BaseInput from '../../BaseInput';
import SendIcon from '../../../../_assets/icons/SendIcon';
import { getMessages } from '@/services/message.services';
import { getUserId } from '@/services/user.services';
import { useSendMessage } from '../../../../../hooks/useMessage';
import { useMessageStore } from '@/zustand/message.store';

interface FormValues {
  message: string;
}

function MessageItem() {
  const params = useParams();
  const userId = getUserId();
  const {
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm<FormValues>();

  const { getMessage, messages } = useMessageStore();

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    (async () => {
      const res = await getMessages({ limit: 15, offset: 1, conversationId: params.id as string });
      getMessage(res.data.message.messages);
    })();
  }, []);

  const { sendMessage } = useSendMessage(
    params.id as string,
    watch('message'),
    'a',
  );
  const onSubmitSendMessage = async () => {
    try {
      await sendMessage();
      reset();
    } catch (err) {
      console.log(err.messagge);
    }
  };
  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-full">
        <div className="flex flex-col h-full">
          <div className="flex justify-between border-0 border-b-2 border-[#202227] pb-5 px-4">
            <div>
              <p>abc</p>
            </div>
            <div>
              <p>icon</p>
            </div>
          </div>
          <div
            className="overflow-y-auto h-full basis-0 grow scrollbar-message px-4"
            ref={messagesContainerRef}
          >
            {messages.map((message) => (
              (userId === message.authorId) ? (
                <div
                  key={message.id}
                  className="flex justify-end my-2 items-center gap-2"
                >
                  <div className="py-2 px-3 rounded-2xl bg-[#0f6fec]">
                    <span>
                      {`${message.text}`}
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  key={message.id}
                  className="flex my-2 items-center gap-2"
                >
                  <Image className="rounded-full w-10 h-10" src={message.author.imageUrl || '/DefaultAvatar.svg'} alt="avatar" width={40} height={40} priority />
                  <div className="py-2 px-3 rounded-2xl bg-[#303030]">
                    <span>
                      {`${message.text}`}
                    </span>
                  </div>

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
