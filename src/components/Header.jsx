'use client';

// Website Header
// Andrew Jiang
// 1/27/2026 @Yousor0

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <header>
      <div className="sticky top-0 z-50 flex items-center justify-between gap-10 mb-5 px-20 py-2 border-b border-black/20 bg-white/10 shadow-sm">
        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="Website Logo"
            width={60}
            height={20}
            className="min-w-20"
          />
        </Link>

        {/* Search bar */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-full min-w-60 items-center gap-2 rounded-md border px-3 py-2 sm:max-w-md md:max-w-xl lg:max-w-2xl"
        >
          <button type="submit" className="flex items-center justify-center">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>

          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm focus:outline-none sm:text-base"
          />
        </form>

        {/* Navigation Bar */}
        <nav className="flex gap-15 whitespace-nowrap">
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/register">Sign Up</Link>
          <Link href="login">Login</Link>
        </nav>
      </div>
    </header>
  );
}
