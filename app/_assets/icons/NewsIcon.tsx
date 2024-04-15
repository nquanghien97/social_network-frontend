/* eslint-disable max-len */
interface SearchIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  width?: number;
  height?: number;
}

function NewsIcon(props: SearchIconProps) {
  const {
    color,
    width = 30,
    height = 30,
    ...rest
  } = props;
  return (
    <svg {...rest} fill={color} width={width} height={height} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
      <path d="m22 3-1.67 1.67L18.67 3 17 4.67 15.33 3l-1.66 1.67L12 3l-1.67 1.67L8.67 3 7 4.67 5.33 3 3.67 4.67 2 3v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zM11 19H4v-6h7zm9 0h-7v-2h7zm0-4h-7v-2h7zm0-4H4V8h16z" />
    </svg>

  );
}

export default NewsIcon;
