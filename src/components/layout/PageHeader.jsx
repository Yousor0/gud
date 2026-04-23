'use client';

import Button from '../ui/Button';
import { useAuth } from '@/context/AuthContext';

export default function PageHeader({ title, subtext }) {
  const { user } = useAuth();

  return (
    <section className="from-brand-primary to-brand-secondary/85 relative flex min-h-64 items-center overflow-hidden rounded-xl bg-linear-to-br">
      {/* Decorative circles */}
      <div className="bg-brand-primary-hover absolute -top-16 -right-16 h-72 w-72 rounded-full opacity-20" />
      <div className="bg-bg-primary absolute right-48 -bottom-8 h-36 w-36 rounded-full opacity-10" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start gap-5 px-5 py-14">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-white sm:text-5xl">{title}</h1>
          {subtext && (
            <p className="max-w-xl text-sm text-white/70 sm:text-base">
              {subtext}
            </p>
          )}
        </div>

        {!user && (
          <div className="flex gap-4">
            <Button href="/register" text="Start your plan" variant="white" />
            <Button href="/about" text="Learn more" variant="borderWhite" />
          </div>
        )}
      </div>
    </section>
  );
}
