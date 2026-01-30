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
      <div className="sticky top-0 z-50 mb-5 flex items-center justify-between gap-10 border-b border-black/20 bg-[#f5f0e7] px-20 py-2 shadow-sm">
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

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-full min-w-60 items-center gap-2 justify-self-start rounded-md border pl-3 sm:max-w-md md:max-w-xl lg:max-w-2xl"
        >
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm focus:outline-none sm:text-base"
          />
          {/* Search Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-tr-sm rounded-br-sm bg-[#9D4431] px-5 py-2 text-[#FAF7F3] hover:bg-[#D07A64]"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            Search
          </button>
        </form>

        {/* Navigation Bar */}
        <nav className="flex gap-15 whitespace-nowrap">
          <Link href="/explore">Explore</Link>
          <Link href="/about">About</Link>
          <Link href="login">Login</Link>
          <Link href="/register">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
}
