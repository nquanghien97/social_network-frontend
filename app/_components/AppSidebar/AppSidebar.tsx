import clsx from 'clsx';
import { MouseEventHandler, PropsWithChildren, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AppSidebarProps extends PropsWithChildren {
  open?: boolean;
  onClose?: () => void;
}

export default function AppSidebar(props: AppSidebarProps) {
  const { children, open, onClose } = props;
  const backdropClass = clsx('h-screen', 'w-screen', 'fixed', 'top-0', 'left-0', 'z-[1]');
  const menuClass = clsx('bg-[#191a1f]', 'w-full', 'sm:w-96', 'h-full', 'flex', 'flex-col border-r-2 border-[#0000001a]');
  const backdropRef = useRef<HTMLDivElement>(null);
  const clickHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === backdropRef.current) {
      onClose?.();
    }
  };
  return (
    <AnimatePresence>
      {open && (
        <motion.div className={backdropClass} ref={backdropRef} onClick={clickHandler}>
          <motion.div
            className={menuClass}
            initial={{ x: '100vw' }}
            animate={{ x: 'calc(100vw - 25rem)' }}
            exit={{ x: '100vw'}}
            transition={{
              ease: 'linear'
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
