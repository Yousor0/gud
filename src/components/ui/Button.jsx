import Link from 'next/link';

export default function Button({
  text,
  variant = 'primary',
  className = '',
  href = '#',
}) {
  const defaultStyles = {
    primary: 'bg-[#9D4431] text-[#FAF7F3] hover:bg-[#D07A64] ',
    secondary: 'bg-[#C3583E] text-[#FAF7F3] hover:bg-[#D07A64] ',
    border:
      'text-[#9D4431] border border-[#9D4431] hover:bg-[#9D4431] hover:text-[#FAF7F3] ',
  };

  // Use the styles from defaultStyles based on the variant
  const variantStyles = defaultStyles[variant] || defaultStyles.primary;

  return (
    <Link
      href={href.startsWith('/') ? href : `/${href}`}
      className={`${variantStyles} ${className} rounded-md px-5 py-2 font-semibold shadow-sm duration-150`}
    >
      {text}
    </Link>
  );
}
