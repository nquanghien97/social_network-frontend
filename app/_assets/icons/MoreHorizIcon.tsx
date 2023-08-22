interface MoreHorizIconProps {
  fill?: string;
  width?: number;
  height?: number;
}

function MoreHorizIcon(props: MoreHorizIconProps) {
  const { fill, width, height } = props;
  return (
    <svg fill={fill} width={width} height={height} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="MoreHorizIcon">
      <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
}

export default MoreHorizIcon;
