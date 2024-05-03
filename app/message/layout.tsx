import { Metadata } from 'next';
import { AppHeader } from '../_components/AppHeader';
import Layout from './_Layout';

export const metadata: Metadata = {
  title: 'Message',
  description: 'A Website about social network',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AppHeader />
      <div className="pt-20 pb-6 px-6 h-screen">
        <div className="flex flex-col lg:flex-row h-full">
          <Layout />
          <div className="py-5 px-5 w-full h-full flex items-center justify-center bg-[#0f0f10] border border-[#0f0f10] rounded-md">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
