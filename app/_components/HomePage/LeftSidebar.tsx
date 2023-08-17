import Image from 'next/image';
import DefaultAvatar from '../../_assets/DefaultAvatar.svg';

export function LeftSidebarItem() {
  return (
    <div className="lg:mt-4">
      <div className="bg-[#0f0f10] border border-[#0f0f10] rounded-md">
        <div className="p-5">
          <div>
            <div className="">
              <div className="h-16 w-16 m-auto mb-4">
                <Image src={DefaultAvatar} alt="Default Avatar" className="w-full h-full rounded-md" />
              </div>
              <h5 className="text-xl">Name</h5>
              <small className="text-sm text-[#ccc]">Description</small>
              <p className="my-4 text-[#ccc]">introduce</p>
              <div>Thông số</div>
            </div>
            <hr className="my-4" />
            <ul>
              <li className="py-1.5 hover:text-[#0f6fec] cursor-pointer">Feed</li>
              <li className="py-1.5 hover:text-[#0f6fec] cursor-pointer">Connections</li>
              <li className="py-1.5 hover:text-[#0f6fec] cursor-pointer">Latest News</li>
              <li className="py-1.5 hover:text-[#0f6fec] cursor-pointer">Events</li>
              <li className="py-1.5 hover:text-[#0f6fec] cursor-pointer">Groups</li>
              <li className="py-1.5 hover:text-[#0f6fec] cursor-pointer">Notifications</li>
              <li className="py-1.5 hover:text-[#0f6fec] cursor-pointer">Settings</li>
            </ul>
          </div>
          <hr className="my-4" />
          <div className="py-2 px-5 text-center text-[#0f6fec] hover:text-[#0c59bd] cursor-pointer">
            View Profile
          </div>
        </div>
      </div>
      <ul className="mt-6 flex flex-wrap justify-center">
        <li className="py-1 px-3 hover:text-[#0f6fec] cursor-pointer">About</li>
        <li className="py-1 px-3 hover:text-[#0f6fec] cursor-pointer">Settings</li>
        <li className="py-1 px-3 hover:text-[#0f6fec] cursor-pointer">Support</li>
        <li className="py-1 px-3 hover:text-[#0f6fec] cursor-pointer">Docs</li>
        <li className="py-1 px-3 hover:text-[#0f6fec] cursor-pointer">Help</li>
        <li className="py-1 px-3 hover:text-[#0f6fec] cursor-pointer">Privacy & terms</li>
      </ul>
    </div>
  );
}
function LeftSidebar() {
  return (
    <div className="w-1/4 sticky top-14 max-h-0 px-3 z-[100] max-lg:hidden">
      {/* <div className="">
        {windowSize.width > 1024 ? (
          <LeftSidebarItem />
        ) : (
          <AppSidebar
            open={open}
            setOpen={setOpen}
            start="-24rem"
            end="0"
            exit="-24rem"
          >
            <LeftSidebarItem />
          </AppSidebar>
        )}
      </div> */}
      <LeftSidebarItem />
    </div>
  );
}

export default LeftSidebar;
