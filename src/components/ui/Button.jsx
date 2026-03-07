'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

export default function Button({
  text,
  children,
  variant = 'primary',
  className = '',
  href = '#',
}) {
  const defaultStyles = {
    primary:
      'bg-[#9D4431] text-[#FAF7F3] hover:bg-[#D07A64] font-semibold shadow-sm ',
    secondary:
      'bg-[#C3583E] text-[#FAF7F3] hover:bg-[#D07A64] font-semibold shadow-sm ',
    border:
      'text-[#9D4431] border border-[#9D4431] hover:bg-[#D07A64] hover:text-[#FAF7F3] hover:border-[#D07A64] font-medium',
    delete:
      'text-[#9D4431] border border-[#9D4431] hover:bg-[#8B0000] hover:text-[#FAF7F3] hover:border-[#8B0000] font-medium',
    fitness: 'bg-[#466273] text-[#F5F0E7]',
    nutrition: 'bg-[#566835] text-[#F5F0E7]',
  };

  // Use the styles from defaultStyles based on the variant
  const variantStyles = defaultStyles[variant] || defaultStyles.primary;

  return (
    <motion.button
      whileHover={{ scale: 1.02, translateY: -1 }}
      whileTap={{ scale: 0.99 }}
      style={{ originX: 0.5, originY: 0.5 }}
      className={className}
    >
      <Link
        href={href.startsWith('/') ? href : `/${href}`}
        className={`${variantStyles} block w-full rounded-md px-5 py-2 text-center duration-150`}
      >
        {children ?? text}
      </Link>
    </motion.button>
  );
}
