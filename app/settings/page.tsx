'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import BaseButton from '../_components/common/BaseButton';
import BaseInput from '../_components/common/BaseInput';
import BaseTextarea from '../_components/common/BaseTextarea';
import { useAuth } from '@/zustand/auth.store';
import { updateUser } from '@/services/user.services';

interface FormValues {
  fullName?: string;
  location?: string;
  description?: string;
  job?: string;
  image?: File;
}

const schema = yup
  .object({
    fullName: yup
      .string(),
    // .required('Trường này là bắt buộc'),
    location: yup
      .string(),
    description: yup
      .string(),
    job: yup
      .string(),
  });

function Settings() {
  const [loading, setLoading] = useState(false);
  const { user, setProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await updateUser(data);
      setProfile({ ...user, ...data });
      console.log(data);
      toast.success('Cập nhật thành công', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error('Cập nhật thất bại, vui lòng thử lại', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="w-full py-1.5">
      <div className="border-b-[1px] border-inherit py-2 mb-2">
        <h2 className="text-xl font-bold">Update Profile</h2>
      </div>
      <div className="w-full flex justify-center items-center relative max-lg:h-full">
        <form
          className="w-full bg-[#0f0f10] rounded-md max-lg:h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="mb-4">
              <BaseInput
                label="Full Name"
                placeholder="Enter your Full Name"
                message={errors.fullName?.message}
                defaultValue={user.fullName || ''}
                {...register('fullName')}
              />
            </div>
            <div className="mb-4">
              <BaseInput
                label="Location"
                placeholder="Enter your location"
                message={errors.location?.message}
                defaultValue={user.location || ''}
                {...register('location')}
              />
            </div>
            <div className="mb-4">
              <BaseInput
                label="Job Title"
                placeholder="Enter your description"
                message={errors.job?.message}
                defaultValue={user.job || ''}
                {...register('job')}
              />
            </div>
            <BaseTextarea
              label="Description"
              placeholder="Enter your description"
              message={errors.description?.message}
              defaultValue={user.description || ''}
              rows={3}
              {...register('description')}
            />
          </div>
          <div className="pt-2 w-full">
            <BaseButton
              type="submit"
              className="py-4"
              loading={loading}
            >
              Update Profile
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
