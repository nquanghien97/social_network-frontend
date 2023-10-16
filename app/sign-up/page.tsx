'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import backgroundSignup from '../_assets/background-signup.jpg';
import signinImage from '../_assets/signin-image.svg';
import BaseInput from '../_components/common/BaseInput';
import HidePassword from '../_assets/icons/HidePassword';
import ShowPassword from '../_assets/icons/ShowPassword';
import BaseButton from '../_components/common/BaseButton';
import { signUp } from '../../services/auth.services';

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .required()
      .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email không hợp lệ'),
    password: yup
      .string()
      .required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp'),
  });

function SignIn() {
  const [togglePassword, setTogglePassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const toggleClickPassword = () => {
    setTogglePassword(!togglePassword);
  };

  const onSubmit = (data: FormValues) => {
    signUp(data);
  };

  return (
    <div className="h-screen relative z-0">
      <Image
        className="h-screen object-cover opacity-10"
        layout="fill"
        src={backgroundSignup}
        alt=""
      />
      <div className="flex justify-center items-center flex-col max-lg:h-full">
        <div className="w-full">
          <div className="w-full relative z-10 flex justify-center items-center mt-16">
            <Image src={signinImage} alt="" className="" />
          </div>
        </div>
        <div className="w-full flex justify-center items-center relative max-lg:h-full">
          <form className="lg:w-1/2 w-full p-12 bg-[#0f0f10] rounded-md max-lg:h-full" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-6 text-center text-4xl font-bold">Sign in</h2>
            <p className="mb-4 text-center">
              <span>Already have an account?</span>
              <Link scroll={false} href="/sign-up" className="text-[#0f6fec] hover:text-[#0c59bd] duration-300 px-2">Sign in here</Link>
            </p>
            <div>
              <BaseInput
                label="Email"
                placeholder="Enter your email address"
                message={errors.email?.message}
                {...register('email')}
              />
              <BaseInput
                label="Password"
                placeholder="Enter your password"
                endIcon={togglePassword ? <ShowPassword /> : <HidePassword />}
                onShowPassword={toggleClickPassword}
                type={togglePassword ? 'text' : 'password'}
                message={errors.password?.message}
                {...register('password')}
              />
              <BaseInput
                label="Confirm Password"
                placeholder="Confirm password"
                message={errors.confirmPassword?.message}
                type="password"
                {...register('confirmPassword')}
              />
            </div>
            <div className="pt-2">
              <BaseButton type="submit" className="py-4">Login</BaseButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
