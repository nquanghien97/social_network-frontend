interface InsertPhotoProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}
function InsertPhoto(props: InsertPhotoProps) {
  const {
    width,
    height,
    fill = '#a1a1a7',
    className,
  } = props;
  return (
    <svg className={className} width={width} height={height} fill={fill} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
    </svg>
  );
}

export default InsertPhoto;
