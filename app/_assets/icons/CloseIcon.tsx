export default function CloseIcon(props: { fill?:string, width?:number, height?:number }) {
  const { fill, width, height } = props;
  return (
    <svg width={width} height={height} fill={fill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
