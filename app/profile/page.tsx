'use client';

import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

function Profile() {
  const profile = useSelector((state: RootState) => state.profile);
  console.log(profile);
  return (
    <div className="pt-14 w-full xl:container mx-auto h-ful">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-1 flex-col w-full lg:w-2/3 mt-6 px-3">
          <div className="rounder-md">
            <div className="border rounded-md">
              <Image width={100} height={100} src="https://social.webestica.com/assets/images/post/1by1/02.jpg" alt="background-image" />
            </div>
          </div>
          <div>
            card-title
          </div>
          <div>
            body
          </div>
        </div>
        <div className="flex flex-0 ww-full lg:w-1/3 mt-6 px-3">
          right
        </div>
      </div>
    </div>
  );
}

export default Profile;
