'use client';

import './globals.css';
// import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import Head from 'next/head';
import { ReduxProvider } from '../store/provider';
import { getUser } from '@/services/user.services';
import { isAuthenticated } from '../utils/isAuthenticated';
import { useAuth } from '@/zustand/auth.store';

const inter = Inter({ subsets: ['latin'] });

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { setProfile } = useAuth();
  useEffect(() => {
    (async () => {
      if (isAuthenticated()) {
        const res = await getUser();
        setProfile(res);
      }
    })();
  }, []);
  return (
    <html lang="en">
      <Head>
        <title>Social Network</title>
      </Head>
      <body className={inter.className}>
        <ReduxProvider>
          {children}
          <ToastContainer autoClose={2000} />
        </ReduxProvider>
      </body>
    </html>
  );
}

export default RootLayout;
