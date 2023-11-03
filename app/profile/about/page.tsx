'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import WorkIcon from '../../_assets/icons/WorkIcon';
import LocationIcon from '../../_assets/icons/LocationIcon';
import CalendarIcon from '../../_assets/icons/CalendarIcon';
import MessageIcon from '../../_assets/icons/MessageIcon';

function About() {
  const profile = useSelector((state: RootState) => state.profile);

  const timeCreated = new Date(profile.createdAt);
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
            <p className="text-[#a1a1a8]">{profile.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="px-4 w-1/2">
            <div className="px-3 py-2 border border-[#313235] rounded-lg mb-4 flex items-center">
              <WorkIcon fill="#a1a1a8" />
              <p className="text-[#a1a1a8] px-2">{profile.job}</p>
            </div>
          </div>
          <div className="px-4 w-1/2">
            <div className="px-3 py-2 border border-[#313235] rounded-lg mb-4 flex items-center">
              <LocationIcon fill="#a1a1a8" />
              <p className="text-[#a1a1a8] px-2">{`Live in: ${profile.location}`}</p>
            </div>
          </div>
          <div className="px-4 w-1/2">
            <div className="px-3 py-2 border border-[#313235] rounded-lg mb-4 flex items-center">
              <CalendarIcon fill="#a1a1a8" />
              <p className="text-[#a1a1a8] px-2">{formatTimeCreated}</p>
            </div>
          </div>
          <div className="px-4 w-1/2">
            <div className="px-3 py-2 border border-[#313235] rounded-lg mb-4 flex items-center">
              <MessageIcon fill="#a1a1a8" />
              <p className="text-[#a1a1a8] px-2">{`Email: ${profile.email}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
