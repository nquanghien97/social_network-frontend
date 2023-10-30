import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import BaseButton from '../_components/common/BaseButton';
import { RootState } from '../../store';
import BaseInput from '../_components/common/BaseInput';
import { updateUser } from '@/services/user.services';
import BaseTextarea from '../_components/common/BaseTextarea';
import AddAPhotoIcon from '../_assets/icons/AddAPhotoIcon';

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
  const [loading, setLoading] = useState(false);
  const profile = useSelector((state: RootState) => state.profile);
  const [file, setFile] = useState<File>();

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file as File);
      formData.append('fullName', data.fullName!);
      formData.append('location', data.location!);
      formData.append('description', data.description!);
      formData.append('job', data.job!);
      await updateUser(formData);
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
    <div className="flex flex-1 flex-col w-full mt-6 py-6 bg-[#0f0f10] rounded-md min-w-[400px]">
      <div className="rounder-md">
        <div className="flex items-center">
          <form className="w-full p-6 bg-[#0f0f10] rounded-md max-lg:h-full flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-6 text-center text-4xl font-bold">Update Profile</h2>
            <div className="relative">
              <div className="absolute right-1 z-10 w-full h-full">
                <label htmlFor="icon-button-file" className="cursor-pointer w-full h-full block">
                  <div>
                    <AddAPhotoIcon fill="white" />
                  </div>
                  <input onChange={onFileChange} id="icon-button-file" type="file" className="hidden" />
                </label>
              </div>
              {file ? (
                <Image className="border-2 rounded-full m-auto h-auto cursor-pointer" width={100} height={100} src={URL.createObjectURL(file!)} alt="preview avatar" />
              ) : (
                <Image className="border-2 rounded-full m-auto h-auto cursor-pointer" width={100} height={100} src={profile.imageUrl} alt="avatar" />
              )}
            </div>
            <div className="w-full">
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
                label="Job Title"
                placeholder="Enter your description"
                message={errors.job?.message}
                defaultValue={profile.job || ''}
                {...register('job')}
              />
              <BaseTextarea
                label="Description"
                placeholder="Enter your description"
                message={errors.description?.message}
                defaultValue={profile.description || ''}
                rows={5}
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
