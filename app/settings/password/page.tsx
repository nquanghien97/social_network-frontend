'use client';

import { useState } from 'react';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import BaseInput from '../../_components/common/BaseInput';
import BaseButton from '../../_components/common/BaseButton';
import { updatePassword } from '@/services/user.services';

const schema = yup
  .object({
    oldPassword: yup
      .string()
      .required(),
    newPassword: yup
      .string()
      .required(),
    confirmNewPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('newPassword')], 'Mật khẩu không trùng khớp'),
  });

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

function Password() {
  const [loading, setLoading] = useState(false);

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
      await updatePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      toast.success('Cập nhật mật khẩu thành công!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      toast.error(err.response?.data.message, {
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
        <h2 className="text-xl font-bold">Change password</h2>
      </div>
      <div className="w-full flex justify-center items-center relative max-lg:h-full">
        <form
          className="w-full bg-[#0f0f10] rounded-md max-lg:h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="mb-4">
              <BaseInput
                label="Old password"
                placeholder="Enter Old password"
                type="password"
                message={errors.oldPassword?.message}
                {...register('oldPassword')}
              />
            </div>
            <div className="mb-4">
              <BaseInput
                label="New Password"
                placeholder="Enter your new password"
                type="password"
                message={errors.newPassword?.message}
                {...register('newPassword')}
              />
            </div>
            <div className="mb-4">
              <BaseInput
                label="Confirm New Password"
                placeholder="Confirm new password"
                message={errors.confirmNewPassword?.message}
                type="password"
                {...register('confirmNewPassword')}
              />
            </div>
          </div>
          <div className="pt-2">
            <BaseButton type="submit" className="py-4" loading={loading}>Update Password</BaseButton>
          </div>
          <div className="py-4 text-center text-[#0f6fec] hover:text-[#0c59bd]">
            <Link href="/password-reset">Quên mật khẩu</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Password;
