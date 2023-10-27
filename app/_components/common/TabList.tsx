import {
  ReactNode,
  Children,
  cloneElement,
  isValidElement,
} from 'react';
import { TabsItemProps } from './TabItem';

interface TabListProps {
  children: ReactNode;
  handleTabClick: (index: number) => void;
  // value: number;
}

function TabList(props: TabListProps) {
  const {
    children,
    handleTabClick,
    // value
  } = props;

  return (
    <ul className="pl-0 border-b-[5px] border-b-[#eee] flex">
      {Children.map<ReactNode, ReactNode>(children, (child, index) => {
        if (isValidElement<TabsItemProps>(child)) {
          return cloneElement(child, {
            onClick: () => {
              handleTabClick(index);
            },
            // classNameActive: value === index ? 'active' : '',
          });
        }
        return null;
      })}
    </ul>
  );
}

export default TabList;
