'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getImagePosts } from '@/services/post.services';
import NavLink from '@/components/common/NavLink';

interface ListPhotos {
  imageUrl: string;
  id: number;
}

function Photos() {
  const [listPhotos, setListPhotos] = useState<ListPhotos[]>([]);
  const params = useParams();
  const profileId = params.profileId as string;

  useEffect(() => {
    (async () => {
      const res = await getImagePosts(profileId);
      setListPhotos(res.data.imagesUser);
    })();
  }, []);

  if (listPhotos.length === 0) {
    return (
      <div className="flex flex-col w-full bg-[#0f0f10] rounded-md p-6">
        <p className="py-4 text-3xl font-bold">Photos</p>
        <div className="flex gap-2">
          <p className="text-center text-xl w-full">Chưa có ảnh nào!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-[#0f0f10] rounded-md p-6">
      <p className="py-4 text-3xl font-bold">Photos</p>
      <div className="flex gap-2">
        {listPhotos.map((photo) => (
          (photo.imageUrl) ? (
            <NavLink
              className="w-[150px] h-[150px]"
              href={`/posts/${photo.id}`}
              key={photo.id}
            >
              <Image
                className="w-full h-full rounded-md cursor-pointer"
                src={photo.imageUrl}
                alt={photo.imageUrl}
                width={150}
                height={150}
              />
            </NavLink>
          ) : (
            null
          )
        ))}
      </div>
    </div>
  );
}

export default Photos;
