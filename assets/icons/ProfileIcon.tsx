/* eslint-disable max-len */
interface SearchIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  width?: number;
  height?: number;
}

function ProfileIcon(props: SearchIconProps) {
  const {
    color,
    width = 30,
    height = 30,
    ...rest
  } = props;
  return (
    <svg {...rest} fill={color} width={width} height={height} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4" />
    </svg>

  );
}

export default ProfileIcon;
