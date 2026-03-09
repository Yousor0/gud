'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Searchbar from '../Searchbar';
import Button from '../ui/Button';
import NavigationLink from '../ui/NavigationLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faCompass,
  faInfoCircle,
  faArrowRightToBracket,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence, easeOut } from 'motion/react';
import { CldImage } from 'next-cloudinary';
import { useAuth } from '../../context/AuthContext';
import UserMenu from './UserMenu';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const pathname = usePathname();

  return (
    <header>
      <div className="sticky top-0 z-50 border-b border-black/20 bg-[#F5F0E7] shadow-sm">
        <div className="mx-auto flex w-auto max-w-7xl items-center justify-between gap-4 p-4">
          {/* Logo */}
          <Link href="/">
            <CldImage
              src="logo_pkk35p"
              alt="Website Logo"
              width="60"
              height="20"
              className="min-w-20"
            />
          </Link>

          <Searchbar />

          {/* Desktop Navigation */}
          <nav className="hidden items-center justify-end gap-7 lg:flex">
            <NavigationLink href="/explore" text="Explore" />
            <NavigationLink href="/about" text="About" />
            {!loading && (
              <>
                {user ? (
                  <UserMenu />
                ) : (
                  <>
                    <NavigationLink href="/login" text="Login" />
                    <Button href="/register" text="Register" />
                  </>
                )}
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="flex items-center justify-center p-2 text-[#9D4431] lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <FontAwesomeIcon icon={faX} className="cursor-pointer" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="cursor-pointer" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              className="absolute top-full right-0 left-0 -z-40 flex flex-col items-center justify-center gap-1 border-b border-black/10 bg-[#F5F0E7] px-4 py-3 shadow-md lg:hidden"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: easeOut }}
              exit={{ y: -20, opacity: 0 }}
            >
              {!loading && user && (
                <div className="mb-1 w-full border-b border-black/20 pb-2">
                  <UserMenu mobile />
                </div>
              )}
              <Link
                href="/explore"
                className={`block w-full rounded-md px-3 py-1.5 text-left text-sm duration-100 hover:bg-black/5 ${pathname === '/explore' ? 'font-semibold text-[#9D4431]' : ''}`}
              >
                <FontAwesomeIcon icon={faCompass} className="mx-1" />
                Explore
              </Link>
              <Link
                href="/about"
                className={`block w-full rounded-md px-3 py-1.5 text-left text-sm duration-100 hover:bg-black/5 ${pathname === '/about' ? 'font-semibold text-[#9D4431]' : ''}`}
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mx-1" />
                About
              </Link>
              {!loading && !user && (
                <>
                  <Link
                    href="/login"
                    className={`block w-full rounded-md px-3 py-1.5 text-left text-sm duration-100 hover:bg-black/5 ${pathname === '/login' ? 'font-semibold text-[#9D4431]' : ''}`}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightToBracket}
                      className="mx-1"
                    />
                    Login
                  </Link>
                  <Button
                    href="/register"
                    text="Register"
                    className="w-full text-center"
                  />
                </>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
