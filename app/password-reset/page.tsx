'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundSignin from '../_assets/background-signin.svg';
import BaseInput from '../_components/common/BaseInput';
import BaseButton from '../_components/common/BaseButton';
import { sendRequestPasswordResetServices } from '@/services/auth.services';
import { isAuthenticated } from '../../utils/isAuthenticated';

interface FormValues {
  email: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .required('Email là bắt buộc')
      .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email không hợp lệ'),
  });

function RequestPasswordReset() {
  const [loading, setLoading] = useState(false);
  const [sendEmailSuccess, setSendEmailSuccess] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/');
    }
  }, []);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await sendRequestPasswordResetServices(data.email);
      console.log(data.email);
      setSendEmailSuccess(true);
    } catch (err) {
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
            {!sendEmailSuccess ? (
              <>
                <div className="mb-4 text-lg">
                  <span>Please enter your email address to reset your password.</span>
                </div>
                <div>
                  <div className="mb-4">
                    <BaseInput
                      label="Email"
                      placeholder="Enter your email address"
                      message={errors.email?.message}
                      {...register('email')}
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <BaseButton
                    type="submit"
                    className="py-4"
                    loading={loading}
                  >
                    Send password reset email
                  </BaseButton>
                </div>
              </>
            ) : (
              <div>
                <p className="pb-8">Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.</p>
                <BaseButton
                  className="py-4"
                  onClick={() => router.push('/sign-in')}
                >
                  Return to sign in
                </BaseButton>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default RequestPasswordReset;
