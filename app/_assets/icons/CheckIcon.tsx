interface CheckIconProps {
  fill?: string;
  width?: number;
  height?: number;
}
function CheckIcon(props: CheckIconProps) {
  const { fill, width = 20, height = 20 } = props;
  return (
    <svg fill={fill} width={width} height={height} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CheckIcon">
      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}

export default CheckIcon;
