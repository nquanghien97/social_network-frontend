import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';
import LoadingIcon from '../../_assets/icons/LoadingIcon';

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  loading?: boolean;
}
const baseStyles = 'mt-4 flex justify-center items-center text-center px-3 py-2 rounded bg-[#0f6fec1a] hover:bg-[#326de4] duration-300 w-full';

function BaseButton(props: PropsWithChildren<BaseButtonProps>) {
  const {
    children,
    fullWidth,
    loading,
    className,
    ...rest
  } = props;

  const fullWidthStyle = fullWidth ? 'w-full' : '';

  const buttonClass = clsx(baseStyles, fullWidthStyle, className);
  return (
    <button
      className={buttonClass}
      type="button"
      {...rest}
    >
      { loading && <LoadingIcon size="small" />}
      {children}
    </button>
  );
}

export default BaseButton;
