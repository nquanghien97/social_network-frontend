import { AppProps } from 'next/app';
import { useRouter } from 'next/navigation';
import { ComponentType, useState, useEffect } from 'react';
import { isAuthenticated } from '../services/auth.services';
import getComponentName from '../utils/getComponentName';

export default function withAuthetication(Page: ComponentType) {
  function WithAuthentication(props: AppProps['pageProps']) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);
    if (typeof window === 'undefined') return null;
    const router = useRouter();
    if (!isAuthenticated()) {
      router.push('/sign-in');
      return null;
    }
    if (!mounted) return null;
    return <Page {...props} />;
  }

  WithAuthentication.displayName = `WithAuthentication(${getComponentName(
    Page,
  )})`;

  return WithAuthentication;
}
