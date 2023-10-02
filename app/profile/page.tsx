import React from 'react';
import Image from 'next/image';

function Profile() {
  return (
    <div className="pt-14 w-full xl:container mx-auto h-ful">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-1 flex-col w-full lg:w-2/3 mt-6 px-3">
          <div className="rounder-md">
            <div className="border rounded-md">
              <Image src="" alt="background-image" />
            </div>
            <div>
              <div>

              </div>
              <ul>
                
              </ul>
            </div>
            <div>

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
