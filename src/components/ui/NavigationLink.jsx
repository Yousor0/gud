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
    primaryLink: `text-primary transition-colors duration-100 hover:text-[#D07A64] ${
      isActive ? 'font-semibold text-[#9D4431]' : ''
    }`,
    footerLink:
      'text-[#444444] transition-colors duration-100 hover:text-[#D07A64]',
  };

  const variantStyles = defaultStyles[variant] || defaultStyles.primaryLink;

  return (
    <Link href={href} className={`${variantStyles}`} rel={rel} target={target}>
      {text}
    </Link>
  );
}
