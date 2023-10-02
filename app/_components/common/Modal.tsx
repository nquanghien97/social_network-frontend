import clsx from 'clsx';
import {
  useCallback, useRef, useEffect, PropsWithChildren,
} from 'react';
import { createPortal } from 'react-dom';

interface ModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  background?: string;
  className?: string;
}

export default function Modal(props: ModalProps) {
  const {
    children,
    open,
    onClose,
    background,
    className,
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);

  const closeModal = useCallback((event: MouseEvent) => {
    if (
      wrapperRef
      && wrapperRef.current
      && !wrapperRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('click', closeModal, { capture: true });

    return () => {
      document.removeEventListener('click', closeModal, { capture: true });
    };
  }, [closeModal]);

  return open ? createPortal(
    <div className="fixed inset-0 z-[1000]">
      <div className={clsx('fixed inset-0 z-[-1] bg-[#0b0b0b80]', background)} />
      <div className={clsx('opacity-100', className)}>
        <div ref={wrapperRef} className="relative shadow-[0_11px_15px_-7px_rgba(0,0,0,0.2),_0_24px_38px_3px_rgba(0,0,0,0.14),_0_9px_46px_8px_rgba(0,0,0,0.12)] rounded">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  ) : null;
}
