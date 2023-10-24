import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import CenterSidebar from './CenterSidebar';

function HomePage() {
  return (
    <div className="flex flex-wrap max-lg:flex-col pt-14 px-3 relative">
      <LeftSidebar />
      <CenterSidebar />
      <RightSidebar />
    </div>
  );
}

export default HomePage;
