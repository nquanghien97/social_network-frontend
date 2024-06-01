interface PlusIconProps {
  fill?: string;
  width?: number;
  height?: number;
}
function PlusIcon(props: PlusIconProps) {
  const { fill, width, height } = props;
  return (
    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AddIcon" fill={fill} width={width} height={height}><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
  );
}

export default PlusIcon;
