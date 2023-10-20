import { useEffect } from 'react';
import axios from 'axios';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import CenterSidebar from './CenterSidebar';

function HomePage() {
  useEffect(() => {
    const fetchRefreshToken = async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refreshToken`, { refreshToken });
      console.log(response.data.refreshToken);
    };
    fetchRefreshToken();
  }, []);
  return (
    <div className="flex flex-wrap max-lg:flex-col pt-14 px-3 relative">
      <LeftSidebar />
      <CenterSidebar />
      <RightSidebar />
    </div>
  );
}

export default HomePage;
