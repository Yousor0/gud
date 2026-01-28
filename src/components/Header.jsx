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
      <div className="flex content-center items-center justify-between gap-10 px-10 pt-2">
        {/* Logo */}
        <Link href="/">
          <Image src={logo} alt="Website Logo" width={90} height={30} />
        </Link>

        {/* Search bar */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-full items-center gap-2 rounded-md border px-3 py-2 sm:max-w-md md:max-w-xl lg:max-w-2xl"
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
        <nav className="flex gap-15">
          <Link href="/about ">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/register">Sign Up</Link>
          <Link href="login">Login</Link>
        </nav>
      </div>
    </header>
  );
}
