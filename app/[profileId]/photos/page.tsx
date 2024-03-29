'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getImagePosts } from '@/services/post.services';

interface ListPhotos {
  imageUrl: string;
  id: number;
}

function Photos() {
  const [listPhotos, setListPhotos] = useState<ListPhotos[]>([]);
  const { profileId } = useParams();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await getImagePosts(+profileId);
      setListPhotos(res.data.imagesUser);
    })();
  }, []);

  const onImagesClick = (postId: number) => {
    router.push(`/posts/${postId}`);
  };

  if (listPhotos.length === 0) {
    return <p>Chưa có ảnh nào</p>;
  }

  return (
    <div className="flex flex-col w-full bg-[#0f0f10] rounded-md p-6">
      <p className="py-4 text-3xl font-bold">Photos</p>
      <div className="flex gap-2">
        {listPhotos.map((photo) => (
          <div
            className="w-[150px] h-[150px]"
            onClick={() => onImagesClick(photo.id)}
            aria-hidden
            key={photo.id}
          >
            <Image className="w-full h-full rounded-md cursor-pointer" src={photo.imageUrl} alt={photo.imageUrl} width={150} height={150} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Photos;
