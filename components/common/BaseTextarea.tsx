import { ReactNode, forwardRef, TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';

interface BaseTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  label?: string;
  fullWidth?: boolean;
  placeholder?: string;
  type?: string;
  onShowPassword?: () => void;
  message?: string;
  name?: string;
  defaultValue?: string;
}

const BaseTextarea = forwardRef<HTMLTextAreaElement, BaseTextareaProps>((props, ref) => {
  const {
    label,
    fullWidth,
    placeholder,
    startIcon,
    endIcon,
    type,
    onShowPassword,
    message,
    name,
    defaultValue,
    disabled,
    ...rest
  } = props;

  const fullWidthStyle = fullWidth ? 'w-full' : '';
  const containerClass = clsx(fullWidthStyle, 'mb-4');
  const startIconStyle = startIcon ? 'pl-14' : 'pl-5';
  const textareaClass = clsx('px-4 py-2 bg-[#202227] outline-0 border border-[#313235] rounded-lg w-full hover:transition-all duration-300 overflow-hidden resize-none', startIconStyle);
  return (
    <div className={containerClass}>
      {label ? (
        <p className="mb-2 text-base font-semibold">{label}</p>
      ) : null}
      <div className="relative">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none z-10">
          {startIcon}
        </div>
        <textarea
          {...rest}
          ref={ref}
          className={textareaClass}
          defaultValue={defaultValue}
          name={name}
          placeholder={placeholder}
        />
        <div aria-hidden="true" className="absolute inset-y-0 right-2 flex items-center cursor-pointer" onClick={onShowPassword}>
          {endIcon}
        </div>
      </div>
      {message ? (
        <p className="mt-4 text-[red] text-xs">{message}</p>
      ) : null}
    </div>

  );
});

export default BaseTextarea;
