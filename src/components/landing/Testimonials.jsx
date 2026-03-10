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
            className="border-bg-accent bg-bg-secondary flex flex-col gap-4 rounded-lg border p-6 shadow-sm"
          >
            <p className="text-sm italic">&ldquo;{t.quote}&rdquo;</p>
            <div>
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
