import Image from 'next/image';
import { useState } from 'react';
import Modal from '../Modal';
import CloseIcon from '../../../_assets/icons/CloseIcon';
import InsertPhoto from '../../../_assets/icons/InsertPhoto';

function PostFeed() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const onCloseModal = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <div className="flex bg-[#0f0f10] border border-[#0f0f10] rounded-md w-full p-5">
        <div className="h-12 w-12 mr-2">
          <Image src="https://social.webestica.com/assets/images/post/1by1/02.jpg" priority width={48} height={48} alt="" className="h-auto rounded-full cursor-pointer" />
        </div>
        <div
          aria-hidden="true"
          className="w-full flex items-center bg-[#26262b] py-3 px-4 rounded-2xl cursor-pointer hover:bg-[#3f3f47] duration-300"
          onClick={() => setIsOpenModal(true)}
        >
          <span className="text-[#b1adb0]">Share your thoughts...</span>
        </div>
      </div>
      <Modal open={isOpenModal} onClose={onCloseModal}>
        <div className="bg-[#26262b] w-[360px] sm:w-[500px] rounded-md">
          <div className="h-[60px] relative">
            <div className="h-full p-4 flex justify-center items-center border-b border-b-[#ffffff0d]">
              <h2>Create Post</h2>
            </div>
            <div
              aria-hidden="true"
              className="absolute right-4 top-3 h-8 w-8 bg-[#0f6fec1a] ml-auto rounded-full flex items-center justify-center hover:bg-[#a1a1a7] duration-300 cursor-pointer"
              onClick={() => setIsOpenModal(false)}
            >
              <CloseIcon fill="#0f6fec" />
            </div>
          </div>
          <div className="flex flex-col items-center p-4 border-b border-b-[#ffffff0d]">
            <div className="w-full flex mb-4">
              <div className="h-12 w-12 mr-2">
                <Image src="https://social.webestica.com/assets/images/post/1by1/02.jpg" width={48} height={48} alt="" className="h-auto rounded-full cursor-pointer" />
              </div>
              <textarea placeholder="Share your thoughts..." className="resize-none w-full bg-transparent outline-none px-4" />
            </div>
            <div className="w-full">
              <p className="mb-2">Upload attachment</p>
              <div className="border-2 border-dashed rounded-md p-5 cursor-pointer w-full flex justify-center items-center">
                <div className="my-5">
                  <InsertPhoto width={90} height={90} />
                </div>
              </div>
            </div>
          </div>
          <div className="p-3">
            <div className="flex justify-center items-center cursor-pointer duration-300 rounded-md border hover:bg-[#0f6fec] w-full py-3">
              <span>Post</span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PostFeed;
