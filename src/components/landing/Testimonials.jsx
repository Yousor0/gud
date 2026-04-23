'use client';

import { motion, easeOut } from 'motion/react';

const testimonials = [
  {
    name: 'Sarah M.',
    quote:
      'GÜD helped me build a consistent workout routine from my apartment. The beginner plans are incredibly approachable.',
    role: 'Member since 2024',
  },
  {
    name: 'James T.',
    quote:
      'The nutrition guidance completely changed how I think about food. Simple, practical, and actually sustainable.',
    role: 'Member since 2024',
  },
  {
    name: 'Priya K.',
    quote:
      'I love that all the content is made by real certified professionals. It makes a huge difference in quality.',
    role: 'Member since 2025',
  },
];

export default function Testimonials() {
  return (
    <section>
      <h2 className="section-title mb-8 text-center">What Our Members Say</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {testimonials.map((t, index) => (
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2, ease: easeOut }}
            key={index}
            className="border-bg-accent bg-bg-secondary relative flex flex-col gap-4 rounded-lg border p-6 pt-8 shadow-sm"
          >
            <span className="text-brand-primary/20 pointer-events-none absolute top-2 left-4 select-none text-6xl font-bold leading-none">
              &ldquo;
            </span>
            <p className="text-sm italic">{t.quote}</p>
            <div className="mt-auto flex items-center gap-3">
              <div className="bg-brand-primary h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                {t.name[0]}
              </div>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
