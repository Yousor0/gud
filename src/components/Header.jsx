'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.svg';
import Searchbar from './Searchbar';
import Button from './ui/Button';
import NavigationLink from './ui/NavigationLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence, easeOut } from 'motion/react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      <div className="sticky top-0 z-50 mb-5 border-b border-black/20 bg-[#F5F0E7] py-2 shadow-sm">
        <div className="mx-auto flex w-auto max-w-7xl items-center justify-between gap-4 px-4">
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

          {/* Desktop Navigation */}
          <nav className="hidden items-center justify-end gap-7 lg:flex">
            <NavigationLink href="/explore" text="Explore" />
            <NavigationLink href="/about" text="About" />
            <NavigationLink href="/login" text="Login" />
            <Button href="/register" text="Register" />
          </nav>

          {/* Mobile Menu Button */}

          <button
            type="button"
            className="flex items-center justify-center p-2 text-[#9D4431] lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <FontAwesomeIcon icon={faX} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              className="absolute top-full right-0 left-0 -z-40 flex flex-col items-center justify-center gap-6 border-b border-black/10 bg-[#F5F0E7] px-4 py-4 shadow-md lg:hidden"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: easeOut }}
              exit={{ y: -20, opacity: 0 }}
            >
              <NavigationLink href="/explore" text="Explore" />
              <NavigationLink href="/about" text="About" />
              <NavigationLink href="/login" text="Login" />
              <Button
                href="/register"
                text="Register"
                className="w-full text-center"
              />
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
