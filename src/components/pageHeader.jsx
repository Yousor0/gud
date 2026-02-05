'use client';

import Button from './ui/Button';
import Image from 'next/image';

export default function PageHeader({
  title,
  subtext,
  overlayColor = '#f5f0e7',
  image,
}) {
  return (
    <section
      className="relative flex min-h-[30vh] items-center justify-start overflow-hidden"
      style={{ backgroundImage: image }}
    >
      {/* Background Image (right side) */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      {/* Color Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: overlayColor, opacity: 0.85 }}
      />{' '}
      ``
      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4">
        <div>
          <h1 className="text-2xl font-bold sm:text-5xl">{title}</h1>
          <p className="body-primary max-w-xl">{subtext}</p>
        </div>

        <div className="flex gap-5">
          <Button href="/register" text="Start your plan" />
          <Button href="/about" text="Learn more" variant="border" />
        </div>
      </div>
    </section>
  );
}
