import PlusIcon from '../../../../_assets/icons/PlusIcon';

function PostStory() {
  return (
    <div className="h-[150px] px-12 flex justify-center items-center bg-[#0f0f10] border border-[#0f0f10] rounded-md cursor-pointer">
      <div className="text-center w-12 flex flex-col justify-center items-center">
        <div className="h-10 w-10 bg-[#0f6fec1a] mb-1 rounded-full flex items-center justify-center hover:bg-[#a1a1a7] duration-300 cursor-pointer">
          <PlusIcon fill="#f3f0f3" width={16} height={16} />
        </div>
        <h6 className="font-normal text-sm">Post a Story</h6>
      </div>
    </div>
  );
}

export default PostStory;
