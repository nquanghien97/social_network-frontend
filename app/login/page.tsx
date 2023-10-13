'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import backgroundLogin from '../_assets/background-login.svg';
import loginImage from '../_assets/login-image.svg';
import BaseInput from '../_components/common/BaseInput';
import HidePassword from '../_assets/icons/HidePassword';
import ShowPassword from '../_assets/icons/ShowPassword';
import BaseButton from '../_components/common/BaseButton';

interface FormValues {
  email: string;
  password: string;
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
  });

function Login() {
  const [togglePassword, setTogglePassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const toggleClickPassword = () => {
    setTogglePassword(!togglePassword);
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="h-screen relative z-0">
      <Image
        className="h-screen object-cover opacity-10"
        layout="fill"
        src={backgroundLogin}
        alt=""
      />
      <div className="flex justify-center items-center flex-col">
        <div className="w-full">
          <div className="w-full relative z-10 flex justify-center items-center mt-16">
            <Image src={loginImage} alt="" className="" />
          </div>
        </div>
        <div className="w-full flex justify-center items-center relative">
          <form className="lg:w-1/2 p-12 bg-[#0f0f10] rounded-md" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-2 text-center">Login</h2>
            <p className="mb-4 text-center">
              <span>Don&apos;t have an account?</span>
              <Link href="/sign-up" className="text-[#0f6fec] px-2">Click here to sign up</Link>
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

export default Login;
