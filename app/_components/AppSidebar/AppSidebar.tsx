import clsx from 'clsx';
import { Dispatch, MouseEventHandler, PropsWithChildren, SetStateAction, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AppSidebarProps extends PropsWithChildren {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>
  start?: string;
  end?: string;
  exit?: string;
}

export default function AppSidebar(props: AppSidebarProps) {
  const { children, open, setOpen, start = '-24rem', end = 0, exit = '-24rem' } = props;
  const backdropClass = clsx('h-screen', 'w-screen', 'fixed', 'top-0', 'left-0', 'z-[100]');
  const menuClass = clsx('bg-[#191a1f]', 'w-full', 'sm:w-96', 'max-lg:w-96', 'h-full', 'flex', 'flex-col border-r-2 border-[#0000001a]');
  const backdropRef = useRef<HTMLDivElement>(null);
  const clickHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === backdropRef.current) {
      setOpen?.(false)
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className={backdropClass} ref={backdropRef} onClick={clickHandler}>
          <motion.div
            className={menuClass}
            initial={{ x: start }}
            animate={{ x: end }}
            exit={{ x: exit }}
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
