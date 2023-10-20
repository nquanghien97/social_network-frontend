import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import BaseButton from '../_components/common/BaseButton';
import { RootState } from '../../store';
import BaseInput from '../_components/common/BaseInput';
import { updateUser } from '@/services/user.services';

interface FormValues {
  fullName?: string;
  location?: string;
  description?: string;
}

const schema = yup
  .object({
    fullName: yup
      .string(),
    location: yup
      .string(),
    description: yup
      .string(),
  });

function EditProfile({ onClose } : { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const profile = useSelector((state: RootState) => state.profile);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await updateUser(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="flex flex-1 flex-col w-full mt-6 py-6 bg-[#0f0f10] rounded-md min-w-[400px]">
      <div className="rounder-md">
        <div className="flex items-center">
          <form className="w-full p-6 bg-[#0f0f10] rounded-md max-lg:h-full" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-6 text-center text-4xl font-bold">Update Profile</h2>
            <Image className="border-2 rounded-full m-auto" width={100} height={100} src="https://social.webestica.com/assets/images/post/1by1/02.jpg" alt="background-image" />
            <div>
              <BaseInput
                label="Full Name"
                placeholder="Enter your Full Name"
                message={errors.fullName?.message}
                defaultValue={profile.fullName || ''}
                {...register('fullName')}
              />
              <BaseInput
                label="Location"
                placeholder="Enter your location"
                message={errors.location?.message}
                defaultValue={profile.location || ''}
                {...register('location')}
              />
              <BaseInput
                label="Description"
                placeholder="Enter your description"
                message={errors.description?.message}
                defaultValue={profile.description || ''}
                {...register('description')}
              />
            </div>
            <div className="pt-2">
              <BaseButton
                type="submit"
                className="py-4"
                loading={loading}
              >
                Update
              </BaseButton>
              <BaseButton
                type="submit"
                className="py-4 mt-4"
                loading={loading}
                onClick={onClose}
              >
                Hủy
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
