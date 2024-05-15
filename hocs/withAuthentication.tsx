import { AppProps } from 'next/app';
import { useRouter } from 'next/navigation';
import { ComponentType, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { isAuthenticated } from '../utils/isAuthenticated';
import getComponentName from '../utils/getComponentName';
import isRefreshTokenExpired from '../utils/isRefreshTokenExpired';

export default function withAuthetication(Page: ComponentType) {
  function WithAuthentication(props: AppProps['pageProps']) {
    if (typeof window === 'undefined') return null;
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
      if (isAuthenticated() && isRefreshTokenExpired()) {
        toast.warning('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
        router.push('/sign-in');
      }
      if (!isAuthenticated()) {
        router.push('/sign-in');
      }
    }, []);
    if (!mounted) return null;
    return <Page {...props} />;
  }

  WithAuthentication.displayName = `WithAuthentication(${getComponentName(
    Page,
  )})`;

  return WithAuthentication;
}
