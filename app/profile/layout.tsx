'use client';

import { AppHeader } from '../_components/AppHeader';
import withAuthetication from '../../hocs/withAuthentication';

function RootLayout({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}

export default withAuthetication(RootLayout);
