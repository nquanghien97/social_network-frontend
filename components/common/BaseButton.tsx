import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';
import LoadingIcon from '@/assets/icons/LoadingIcon';

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
}
const baseStyles = 'flex justify-center items-center text-center px-3 py-2 rounded bg-[#0f6fec1a] w-full';

function BaseButton(props: PropsWithChildren<BaseButtonProps>) {
  const {
    children,
    fullWidth,
    loading,
    className,
    disabled,
    ...rest
  } = props;

  const fullWidthStyle = fullWidth ? 'w-full' : '';

  const disabledStyle = clsx(baseStyles, 'bg-[#ccc] text-black cursor-default');

  const buttonClass = clsx(baseStyles, fullWidthStyle, className, 'hover:bg-[#326de4] duration-300');

  const containerClass = disabled ? disabledStyle : buttonClass;
  return (
    <button
      className={containerClass}
      type="button"
      {...rest}
    >
      { loading && <LoadingIcon size="small" />}
      {children}
    </button>
  );
}

export default BaseButton;
