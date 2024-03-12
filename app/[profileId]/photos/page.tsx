'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getImagePosts } from '@/services/post.services';

interface ListPhotos {
  imageUrl: string;
}

function Photos() {
  const [listPhotos, setListPhotos] = useState<ListPhotos[]>([]);
  const { profileId } = useParams();

  useEffect(() => {
    (async () => {
      const res = await getImagePosts(+profileId);
      setListPhotos(res.data.imagesUser);
    })();
  }, []);

  console.log(listPhotos);

  if (listPhotos.length === 0) {
    return <p>Loading....</p>;
  }

  return (
    <div className="flex flex-col w-full bg-[#0f0f10] rounded-md p-6">
      <p>Photos</p>
      <div className="flex gap-2">
        {listPhotos.map((photo) => (
          <div className="w-[150px] h-[150px]">
            <Image className="w-full h-full rounded-md" src={photo.imageUrl} alt={photo.imageUrl} width={150} height={150} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Photos;
