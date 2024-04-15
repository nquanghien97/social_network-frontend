/* eslint-disable max-len */
interface SearchIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  width?: number;
  height?: number;
}

function PrivacyIcon(props: SearchIconProps) {
  const {
    color,
    width = 30,
    height = 30,
    ...rest
  } = props;
  return (
    <svg {...rest} fill={color} width={width} height={height} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5zm-1 6h2v2h-2zm0 4h2v6h-2z" />
    </svg>

  );
}

export default PrivacyIcon;
