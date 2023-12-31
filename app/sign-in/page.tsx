'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundSignin from '../_assets/background-signin.svg';
import signinImage from '../_assets/signin-image.svg';
import BaseInput from '../_components/common/BaseInput';
import HidePassword from '../_assets/icons/HidePassword';
import ShowPassword from '../_assets/icons/ShowPassword';
import BaseButton from '../_components/common/BaseButton';
import { signIn } from '@/services/auth.services';
import { isAuthenticated } from '../../utils/isAuthenticated';

interface FormValues {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .required('Email là bắt buộc')
      .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email không hợp lệ'),
    password: yup
      .string()
      .required('Mật khẩu là bắt buộc'),
  });

function SignIn() {
  const [togglePassword, setTogglePassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/');
    }
  }, []);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const toggleClickPassword = () => {
    setTogglePassword(!togglePassword);
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await signIn(data);
      toast.success('Đăng nhập thành công!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.push('/', { scroll: false });
    } catch (err) {
      toast.error(err.response.data.message, {
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
      <div className="flex justify-center items-center flex-col max-lg:h-full">
        <div className="w-full">
          <div className="w-full relative z-10 flex justify-center items-center mt-16">
            <Image src={signinImage} alt="" className="" unoptimized />
          </div>
        </div>
        <div className="w-full flex justify-center items-center relative max-lg:h-full">
          <form className="lg:w-1/2 w-full p-12 bg-[#0f0f10] rounded-md max-lg:h-full" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-6 text-center text-4xl font-bold">Sign in</h2>
            <div className="mb-4 text-center">
              <span>Don&apos;t have an account?</span>
              <Link scroll={false} href="/sign-up" className="text-[#0f6fec] hover:text-[#0c59bd] duration-300 px-2">Click here to sign up</Link>
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
              <div className="mb-4">
                <BaseInput
                  label="Password"
                  placeholder="Enter your password"
                  endIcon={togglePassword ? <ShowPassword /> : <HidePassword />}
                  onShowPassword={toggleClickPassword}
                  type={togglePassword ? 'text' : 'password'}
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
                Login
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
