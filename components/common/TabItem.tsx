import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export interface TabsItemProps {
  classNameActive?: string;
  label: string;
  onClick?: () => void;
  path: string;
}

function TabItem(props: TabsItemProps) {
  const {
    label,
    classNameActive,
    onClick,
    path,
  } = props;
  const pathname = usePathname();
  const activeClass = pathname === path ? 'active' : '';
  const tabStylesAfter = "after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:h-0.5 after:w-0 after:bg-[#6979f8] after:duration-300 after:h-[5px]";
  const tabStyles = clsx('relative inline-block py-2 sm:min-w-[160px] text-center cursor-pointer flex-1', classNameActive, tabStylesAfter, activeClass);
  return (
    <li
      aria-hidden="true"
      className={tabStyles}
      onClick={onClick}
    >
      {label}
    </li>
  );
}

export default TabItem;
