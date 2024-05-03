import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import BaseInput from '../../BaseInput';
import SendIcon from '../../../../_assets/icons/SendIcon';

// interface MessageItemProps {
//   dataMessages: MessageEntity[];
// }

function MessageItem() {
  const params = useParams();
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmitSendMessage = (data: unknown) => {
    console.log(data);
    reset();
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
          {/* <div className="flex-1 py-5">
            {dataMessages.map((message) => (
              <div key={message.id} className={`flex ${userId === message.senderId ? 'justify-end' : ''}`}>{`${message.text} & ${message.senderId}`}</div>
            ))}
          </div> */}
          <p>{params.id}</p>
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
