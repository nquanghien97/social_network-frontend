import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css';
import { HandleOnComplete } from '../lib/router-event';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Social Network',
  description: 'A Website about social network',
};

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>Social Network</title>
      </Head>
      <body className={inter.className}>
        {children}
        <ToastContainer autoClose={2000} />
        <HandleOnComplete />
      </body>
    </html>
  );
}

export default RootLayout;
