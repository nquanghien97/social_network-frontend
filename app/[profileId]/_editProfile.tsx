import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import BaseButton from '@/components/common/BaseButton';
import BaseInput from '@/components/common/BaseInput';
import BaseTextarea from '@/components/common/BaseTextarea';
import { updateUser } from '@/services/user.services';
import { useAuth } from '@/zustand/auth.store';

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

function EditProfile({ onClose } : { onClose: () => void }) {
  const { user, setProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await updateUser(data);
      setProfile({ ...user, ...data });
      toast.success('Cập nhật thành công', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error('Cập nhật thất bại, vui lòng thử lại', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="flex flex-1 flex-col w-full mt-6 py-6 bg-[#0f0f10] border rounded-md min-w-[400px]">
      <div className="rounder-md">
        <div className="flex items-center">
          <form className="w-full p-6 bg-[#0f0f10] rounded-md max-lg:h-full flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-6 text-center text-4xl font-bold">Update Profile</h2>
            <div className="w-full">
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
                Update
              </BaseButton>
              <BaseButton
                className="py-4 mt-4"
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
