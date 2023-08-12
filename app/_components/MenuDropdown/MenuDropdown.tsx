import { RefObject, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ListMenuType {
  subTitle: string;
  href: string;
}
interface MenuDropdownProps {
  listMenu: ListMenuType[];
  title: string;
}

function MenuDropdown(props: MenuDropdownProps) {
  const { listMenu, title } = props;
  const [isHover, setIsHover] = useState(false);
  const onHover = () => {
    if (window.innerWidth > 768) {
      setIsHover(true);
    }
  }
  const offHover = () => {
    if (window.innerWidth > 768) {
      setIsHover(false);
    }
  }
  const toggleClick = () => {
    if (window.innerWidth <= 768) {
      setIsHover(!isHover);
    }
  }
  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5
      },
      display: "block"
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      display: "none"
    }
  };

  const dropdownRef: RefObject<HTMLDivElement> = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsHover(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          animate={isHover ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <div className="bg-[#0f0f10] flex flex-col min-w-[15rem] border border-[#ffffff12] rounded-md py-4">
            {listMenu.map((item, index) => (
              <Link key={index} href={item.href} className="cursor-pointer hover:text-[#0f6fec] px-4 py-2 w-full">{item.subTitle}</Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default MenuDropdown