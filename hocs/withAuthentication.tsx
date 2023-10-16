import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ComponentType } from 'react';
import { isAuthenticated } from '../services/auth.services';

export default function withAuthetication(Page: ComponentType) {
  function WithAuthentication(props: AppProps['pageProps']) {
    if (typeof window === 'undefined') return null;

    const router = useRouter();

    if (!isAuthenticated()) {
      router.push('/sign-in');
      return null;
    }

    return <Page {...props} />;
  }

  return WithAuthentication;
}
