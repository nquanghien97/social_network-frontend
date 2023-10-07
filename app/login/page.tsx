import React from 'react';
import Image from 'next/image';
import backgroundLogin from '../_assets/background-login.svg';
import loginImage from '../_assets/login-image.svg';

function Login() {
  return (
    <div className="h-screen relative z-0">
      <Image
        className="h-screen object-cover opacity-10"
        layout="fill"
        src={backgroundLogin}
        alt=""
      />
      <div className="flex justify-center items-center flex-col">
        <div className="w-full relative z-10">
          <Image src={loginImage} alt="" className="absolute top-10 right-1/2 translate-x-1/2 lg:w-1/3" />
        </div>
        <div className="lg:w-1/2">
          login
        </div>
      </div>
    </div>
  );
}

export default Login;
