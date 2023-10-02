interface MessageIconProps {
  fill:string;
  width?:number;
  height?:number;
}

function MessageIcon(props: MessageIconProps) {
  const { fill, height = 24, width = 24 } = props;
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill={fill}>
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
    </svg>
  );
}

export default MessageIcon;
