import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppHeader } from '../_components/AppHeader';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en">
      <body className={inter.className}>
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
