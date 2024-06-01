interface SearchIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  width?: number;
  height?: number;
}

function FriendsIcon(props: SearchIconProps) {
  const {
    color,
    width = 30,
    height = 30,
    ...rest
  } = props;
  return (
    <svg {...rest} fill={color} width={width} height={height} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
      <path d="M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.57-3.47-6.33-3.87" />
      <circle cx="9" cy="8" r="4" />
      <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24C14.5 5.27 15 6.58 15 8s-.5 2.73-1.33 3.76c.42.14.86.24 1.33.24m-6 1c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4" />
    </svg>
  );
}

export default FriendsIcon;
