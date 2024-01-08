import { AppProps } from 'next/app';
import { useRouter } from 'next/navigation';
import { ComponentType, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { isAuthenticated } from '../utils/isAuthenticated';
import getComponentName from '../utils/getComponentName';
import LoadingIcon from '../app/_assets/icons/LoadingIcon';
import isRefreshTokenExpired from '../utils/isRefreshTokenExpired';
import { logOut } from '@/services/auth.services';

export default function withAuthetication(Page: ComponentType) {
  function WithAuthentication(props: AppProps['pageProps']) {
    if (typeof window === 'undefined') return null;
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
      if (!isAuthenticated() || isRefreshTokenExpired()) {
        toast.warning('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
        logOut();
        router.push('/sign-in');
      }
    }, []);
    if (!mounted) return null;
    if (!isAuthenticated()) {
      return <div className="w-screen h-screen flex items-center justify-center"><LoadingIcon /></div>;
    }
    return <Page {...props} />;
  }

  WithAuthentication.displayName = `WithAuthentication(${getComponentName(
    Page,
  )})`;

  return WithAuthentication;
}
