import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({
  href,
  variant = 'primaryLink',
  text,
  target,
  rel,
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const defaultStyles = {
    primaryLink: `text-primary transition-colors duration-100 hover:text-brand-primary-hover ${
      isActive ? 'font-semibold text-brand-primary' : ''
    }`,
    footerLink:
      'text-text-accent transition-colors duration-100 hover:text-brand-primary-hover',
  };

  const variantStyles = defaultStyles[variant] || defaultStyles.primaryLink;

  return (
    <Link href={href} className={`${variantStyles}`} rel={rel} target={target}>
      {text}
    </Link>
  );
}
