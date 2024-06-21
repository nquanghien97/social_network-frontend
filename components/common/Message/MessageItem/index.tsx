import {
  useEffect, useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import BaseInput from '@/components/common/BaseInput';
import SendIcon from '@/assets/icons/SendIcon';
import { getMessages } from '@/services/message.services';
import { getUserId } from '@/services/user.services';
import { useSendMessage } from '@/hooks/useMessage';
import { useMessageStore } from '@/zustand/message.store';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingIcon from '@/assets/icons/LoadingIcon';

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
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { getMessage, messages, receiver } = useMessageStore();

  const fetchData = async () => {
    try {
      const res = await getMessages({ limit: 15, offset: page, conversationId: params.id as string });
      getMessage(res.data.message.messages);
      if (res.data.message.messages.length === 0) {
        setHasMore(false);
      }
      setPage((p) => p + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);
  const { sendMessage } = useSendMessage(
    params.id as string,
    watch('message'),
    receiver.id,
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
            <div className="flex items-center gap-2">
              <Image className="rounded-full w-10 h-10" src={receiver.imageUrl || '/DefaultAvatar.svg'} alt="avatar" width={40} height={40} priority />
              <p>{receiver.fullName}</p>
            </div>
          </div>
          <div
            className="overflow-y-auto h-full basis-0 grow"
          >
            <div
              id="scrollableDiv"
              className="h-full overflow-y-auto flex flex-col-reverse scrollbar-message px-4"
              // ref={messagesContainerRef}
            >
              {/* Put the scroll bar always on the bottom */}
              <InfiniteScroll
                dataLength={messages.length}
                next={fetchData}
                className="flex flex-col-reverse w-full"
                inverse
                hasMore={hasMore}
                loader={<div className="flex justify-center py-2"><LoadingIcon /></div>}
                scrollableTarget="scrollableDiv"
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
                      <Image className="rounded-full w-10 h-10" src={message.author?.imageUrl || '/DefaultAvatar.svg'} alt="avatar" width={40} height={40} priority />
                      <div className="py-2 px-3 rounded-2xl bg-[#303030]">
                        <span>
                          {`${message.text}`}
                        </span>
                      </div>

                    </div>
                  )
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
      <form
        className="mx-2 relative [&>div]:mb-0 flex-1"
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