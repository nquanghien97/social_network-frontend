import type { Metadata } from 'next';
import { AppHeader } from '../_components/AppHeader';

export const metadata: Metadata = {
  title: 'Social Network',
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
      {children}
    </>
  );
}
