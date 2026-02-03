'use client';

import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.svg';
import Searchbar from './Searchbar';
import Button from './ui/Button';
import NavigationLink from './ui/NavigationLink';

export default function Header() {
  return (
    <header>
      <div className="sticky top-0 z-50 mb-5 border-b border-black/20 bg-[#F5F0E7] py-2 shadow-sm">
        <div className="flex w-auto items-center justify-between gap-10 px-20">
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

          <Searchbar />

          {/* Navigation Bar */}

          {/* TODO - Mobile NAVBAR */}

          <nav className="flex items-center justify-end gap-7 whitespace-nowrap">
            <NavigationLink href="/explore" text="Explore" />
            <NavigationLink href="/about" text="About" />
            <NavigationLink href="/login" text="Login" />
            <Button href="/register" text="Register" />
          </nav>
        </div>
      </div>
    </header>
  );
}
