import { ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  icon: ReactNode;
  onClick?: () => void;
  label: string;
  subLabel?: string;
  hasDivider?: boolean;
}

export default function AppSidebarItem(props: Props) {
  const {
    icon,
    label,
    subLabel,
    hasDivider = true,
    onClick
  } = props;

  const dividerStyle = hasDivider ? 'border-b border-[#e4e4e44d]' : ''

  const containerClass = clsx(dividerStyle, 'flex', 'items-center', 'p-4', 'cursor-pointer', 'text-white', 'hover:opacity-80')

  return (
    <div className={containerClass} onClick={onClick}>
      <div className='mr-2'>{icon}</div>
      <div className='flex-1'>
        <span>{label}</span>
        <br />
        <span className="text-xs">{subLabel}</span>
      </div>
    </div>
  )
}

