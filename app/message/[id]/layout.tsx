import type { Metadata } from 'next';

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
    [children]
  );
}
