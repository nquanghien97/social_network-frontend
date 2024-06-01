'use client';

import WorkIcon from '@/assets/icons/WorkIcon';
import LocationIcon from '@/assets/icons/LocationIcon';
import CalendarIcon from '@/assets/icons/CalendarIcon';
import MessageIcon from '@/assets/icons/MessageIcon';
import { useAuth } from '@/zustand/auth.store';

function About() {
  const { user } = useAuth();

  const timeCreated = new Date(user.createdAt);
  // eslint-disable-next-line max-len
  const formatTimeCreated = `Join on ${timeCreated.getDate() > 9 ? timeCreated.getDate() : `0${timeCreated.getDate()}`} / ${timeCreated.getMonth() + 1 > 9 ? timeCreated.getMonth() + 1 : `0${timeCreated.getMonth() + 1}`} / ${timeCreated.getFullYear()}`;
  return (
    <div className="lg:container mx-auto h-full bg-[#0f0f10] rounded-md w-full">
      <div className="px-5 pt-5">
        <h2 className="text-2xl font-bold">Profile Info</h2>
      </div>
      <div className="py-6">
        <div className="px-4 mb-4">
          <div className="p-3 border border-[#313235] rounded-lg">
            <h5 className="font-bold mb-2">Overview</h5>
            {user.description ? (
              <p className="text-[#a1a1a8]">{user.description}</p>
            ) : (
              <p className="text-[#a1a1a8]">Chưa có thông tin</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap">
          {user.job && (
            <div className="px-4 w-1/2">
              <div className="px-3 py-2 border border-[#313235] rounded-lg mb-4 flex items-center">
                <WorkIcon fill="#a1a1a8" />
                <p className="text-[#a1a1a8] px-2">{user.job}</p>
              </div>
            </div>
          )}
          {user.location && (
            <div className="px-4 w-1/2">
              <div className="px-3 py-2 border border-[#313235] rounded-lg mb-4 flex items-center">
                <LocationIcon fill="#a1a1a8" />
                <p className="text-[#a1a1a8] px-2">{`Live in: ${user.location}`}</p>
              </div>
            </div>
          )}
          <div className="px-4 w-1/2">
            <div className="px-3 py-2 border border-[#313235] rounded-lg mb-4 flex items-center">
              <CalendarIcon fill="#a1a1a8" />
              <p className="text-[#a1a1a8] px-2">{formatTimeCreated}</p>
            </div>
          </div>
          <div className="px-4 w-1/2">
            <div className="px-3 py-2 border border-[#313235] rounded-lg mb-4 flex items-center">
              <MessageIcon fill="#a1a1a8" />
              <p className="text-[#a1a1a8] px-2">{`Email: ${user.email}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
