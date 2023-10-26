'use client';

import './globals.css';
// import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { ReduxProvider } from '../store/provider';
import { getUser } from '@/services/user.services';
import store from '../store';
import { setProfile } from '../store/reducers/userProfileReducer';
import { isAuthenticated } from '../utils/isAuthenticated';

const inter = Inter({ subsets: ['latin'] });

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated()) {
        const res = await getUser();
        store.dispatch(setProfile(res));
      }
    };
    fetchUser();
  }, []);
  return (
    <html lang="en">
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
