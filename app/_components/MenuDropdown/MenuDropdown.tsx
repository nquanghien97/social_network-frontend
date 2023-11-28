/* eslint-disable no-octal-escape */
import {
  ReactNode,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import { useOutsideClick } from '../../_hooks/useOutsideClick';

interface MenuDropdownProps {
  title: string;
  children: ReactNode;
}

function MenuDropdown(props: MenuDropdownProps) {
  const { children, title } = props;
  const [isHover, setIsHover] = useState(false);
  const onHover = () => {
    if (window.innerWidth > 1024) {
      setIsHover(true);
    }
  };
  const offHover = () => {
    if (window.innerWidth > 1024) {
      setIsHover(false);
    }
  };
  const toggleClick = () => {
    if (window.innerWidth <= 1024) {
      setIsHover(!isHover);
    }
  };
  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: 'block',
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      display: 'none',
    },
  };

  const dropdownRef = useOutsideClick(() => {
    setIsHover(false);
  });

  return (
    <div ref={dropdownRef} className="relative">
      <motion.div
        className="flex items-center"
        onHoverStart={onHover}
        onHoverEnd={offHover}
        onClick={toggleClick}
      >
        <div className="cursor-pointer hover:text-[#0f6fec] leading-[56px] flex items-center after:content-['\25be'] px-4">
          {title}
        </div>
        <motion.div
          className="absolute top-14 z-[100] w-full"
          initial="exit"
          animate={isHover ? 'enter' : 'exit'}
          variants={subMenuAnimate}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default MenuDropdown;
