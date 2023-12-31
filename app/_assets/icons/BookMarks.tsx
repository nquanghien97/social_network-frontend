interface BookMarksProps {
  fill: string;
  width?: number;
  height?: number;
}
function BookMarks(props: BookMarksProps) {
  const { fill, width = 24, height = 24 } = props;
  return (
    <svg width={width} height={height} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="BookmarkBorderIcon" fill={fill}>
      <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15-5-2.18L7 18V5h10v13z" />
    </svg>
  );
}

export default BookMarks;
