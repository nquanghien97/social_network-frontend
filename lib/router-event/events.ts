import NProgress from 'nprogress';

export function onStart() {
  NProgress.start();
  NProgress.configure({ showSpinner: false });
}

export function onComplete() {
  NProgress.done();
  NProgress.configure({ showSpinner: false });
}
