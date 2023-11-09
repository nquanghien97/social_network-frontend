import {
  Dispatch,
  RefObject,
  SetStateAction,
  useState,
} from 'react';
import Modal from '../../../Modal';
import BaseButton from '../../../BaseButton';

interface CommentOptionsProps {
  CommentOptionsRef: RefObject<HTMLDivElement>
  setOpenCommentOptions: Dispatch<SetStateAction<boolean>>
  commentId: string;
  hasDeleteComment?: boolean;
  onDeleteComment?: (id: string) => Promise<void>;
}

function CommentOptions(props: CommentOptionsProps) {
  const {
    CommentOptionsRef, setOpenCommentOptions, commentId, hasDeleteComment, onDeleteComment,
  } = props;
  const [openModalDeleteComment, setOpenModalDeleteComment] = useState(false);

  const onConfirmClick = async () => {
    try {
      if (onDeleteComment) {
        await onDeleteComment(commentId);
      }
      setOpenModalDeleteComment(false);
      setOpenCommentOptions(false);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <div
        className="px-4 py-2 bg-[#26262b] absolute top-full right-0 rounded-md min-w-[180px] text-center"
        ref={CommentOptionsRef}
      >
        <ul className="w-full">
          {hasDeleteComment && (
            <li
              className="py-2 hover:text-[#0f6fec] cursor-pointer duration-300 w-full"
              onClick={() => {
                setOpenModalDeleteComment(true);
              }}
              aria-hidden
            >
              Delete Comment
            </li>
          )}
          <li
            className="py-2 hover:text-[#0f6fec] cursor-pointer duration-300 w-full"
          >
            Report Comment
          </li>
        </ul>
      </div>
      <Modal
        open={openModalDeleteComment}
        onClose={() => setOpenModalDeleteComment(false)}
      >
        <div className="p-5 bg-[#26262b] rounded-md" ref={CommentOptionsRef}>
          <p className="mb-4">Do you want to delete this post?</p>
          <div className="flex gap-4">
            <BaseButton
              onClick={onConfirmClick}
            >
              Confirm
            </BaseButton>
            <BaseButton
              className="text-[red] hover:bg-[red] hover:text-[white]"
              onClick={() => {
                setOpenModalDeleteComment(false);
                setOpenCommentOptions(false);
              }}
            >
              Cancel
            </BaseButton>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CommentOptions;
