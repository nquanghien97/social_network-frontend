import Link from 'next/link';

interface NewsProps {
  title: string;
  time: Date;
  link: string;
}

function NewsTodayItem(props: NewsProps) {
  return (
    <Link className="mt-4 block" href={props.link} target="_blank">
      <h6 className="hover:text-[#326de4] duration-300 cursor-pointer font-extrabold">{props.title}</h6>
      <small>{props.time.toString()}</small>
    </Link>
  );
}

export default NewsTodayItem;
