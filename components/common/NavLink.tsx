import { Link } from '@/lib/router-event';

interface NavLinkProps extends React.PropsWithChildren, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string,
}

export default function NavLink(props: NavLinkProps) {
  const { href, children, ...rest } = props;
  return (
    <Link {...rest} href={href}>
      {children}
    </Link>
  );
}
