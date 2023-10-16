import { useSelector } from 'react-redux';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import CenterSidebar from './CenterSidebar';
import { RootState } from '../../../store';

function HomePage() {
  const profile = useSelector((state: RootState) => state.profile);
  console.log(profile);
  return (
    <div className="flex flex-wrap max-lg:flex-col pt-14 px-3 relative">
      <LeftSidebar />
      <CenterSidebar />
      <RightSidebar />
    </div>
  );
}

export default HomePage;
