'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import backgroundSignin from '../../../_assets/background-signin.svg';
import BaseInput from '../../../_components/common/BaseInput';
import BaseButton from '../../../_components/common/BaseButton';
import { passwordResetServices } from '@/services/auth.services';
import CheckIcon from '../../../_assets/icons/CheckIcon';
import NavLink from '../../../_components/common/NavLink';

interface FormValues {
  password: string;
}

const schema = yup
  .object({
    password: yup
      .string()
      .required('Mật khẩu là bắt buộc'),
  });

function PasswordReset() {
  const { id, token } = useParams();
  const [loading, setLoading] = useState(false);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await passwordResetServices(data.password, id as string, token as string);
      setPasswordResetSuccess(true);
    } catch (err) {
      console.log(err.response?.data.message);
      toast.error(err.response?.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen relative z-0">
      <Image
        className="h-screen object-cover opacity-10"
        fill
        src={backgroundSignin}
        alt=""
        unoptimized
      />
      <div className="flex justify-center items-center flex-col h-full">
        <div className="w-full flex justify-center items-center relative h-full">
          <form className="lg:w-1/2 w-full p-12 bg-[#0f0f10] rounded-mdh-full" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-6 text-2xl font-bold border-b-2 border-inherit py-2">Reset Your Password</h2>
            {!passwordResetSuccess ? (
              <>
                <div className="mb-4 text-lg">
                  <span>Please enter your email address to reset your password.</span>
                </div>
                <div>
                  <div className="mb-4">
                    <BaseInput
                      label="Password"
                      placeholder="Enter your new password"
                      message={errors.password?.message}
                      {...register('password')}
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <BaseButton
                    type="submit"
                    className="py-4"
                    loading={loading}
                  >
                    Submit
                  </BaseButton>
                </div>
              </>
            ) : (
              <div>
                <div className="flex">
                  <p className="pb-8 pr-2">Password reset successfully.</p>
                  <span><CheckIcon fill="green" /></span>
                </div>
                <NavLink href="/sign-in">
                  <BaseButton
                    className="py-4"
                  >
                    Return to sign in
                  </BaseButton>
                </NavLink>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
