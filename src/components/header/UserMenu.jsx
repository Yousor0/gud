'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { avatarUrl } from '@/lib/mediaUrl';
import { useAuth } from '@/context/AuthContext';
import { logout } from '@/features/auth/services/authService';
import { motion, AnimatePresence } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faArrowRightFromBracket,
  faChevronDown,
  faCloudArrowUp,
} from '@fortawesome/free-solid-svg-icons';

export default function UserMenu({ mobile = false, onClose }) {
  const { profile } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push('/');
    router.refresh();
  }

  const isProfessional = profile?.role === 'professional';
  const isPremium = profile?.role === 'user_premium';

  if (mobile) {
    return (
      <div className="w-full">
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-black/5"
        >
          <div
            className={
              isPremium
                ? 'bg-bg-accent rounded-full ring-2 ring-amber-400 ring-offset-2'
                : isProfessional
                  ? 'ring-brand-primary rounded-full ring-2 ring-offset-2'
                  : 'ring-bg-accent rounded-full ring-2 ring-offset-2'
            }
          >
            <Image
              src={avatarUrl(profile?.avatar_s3_key)}
              width={36}
              height={36}
              alt="avatar"
              className="h-9 w-9 rounded-full object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col items-start leading-tight">
            <span className="text-sm font-semibold">
              {profile?.first_name} {profile?.last_name}
            </span>
            <span className="text-xs text-black/60">@{profile?.username}</span>
          </div>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`text-xs text-black/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mx-1 mt-1 pt-1">
                <Link
                  href={`/account/${profile?.username}`}
                  onClick={onClose}
                  className="block w-full rounded-md px-3 py-1.5 text-sm hover:bg-black/5"
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  My Profile
                </Link>
                {profile?.role === 'professional' && (
                  <Link
                    href="/upload"
                    onClick={onClose}
                    className="block w-full rounded-md px-3 py-1.5 text-sm hover:bg-black/5"
                  >
                    <FontAwesomeIcon icon={faCloudArrowUp} className="mr-2" />
                    Upload Video
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full cursor-pointer rounded-md px-3 py-1.5 text-left text-sm hover:bg-black/5"
                >
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="mr-2"
                  />
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-2">
        <div
          className={
            isPremium
              ? 'bg-bg-accent rounded-full ring-2 ring-amber-400 ring-offset-2'
              : isProfessional
                ? 'ring-brand-primary rounded-full ring-2 ring-offset-2'
                : 'ring-bg-accent rounded-full ring-2 ring-offset-2'
          }
        >
          <Image
            src={avatarUrl(profile?.avatar_s3_key)}
            width={36}
            height={36}
            alt="avatar"
            className="aspect-square rounded-full object-cover"
          />{' '}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.15 }}
          >
            <div className="absolute top-full right-0 z-50 mt-2 w-64 rounded-md border border-black/10 bg-[#F5F0E7] py-1.5 shadow-lg">
              <div className="flex items-center gap-2 px-3 py-2">
                <div
                  className={
                    isPremium
                      ? 'bg-bg-accent rounded-full ring-2 ring-amber-400 ring-offset-2'
                      : isProfessional
                        ? 'ring-brand-primary rounded-full ring-2 ring-offset-2'
                        : 'ring-bg-accent rounded-full ring-2 ring-offset-2'
                  }
                >
                  <Image
                    src={avatarUrl(profile?.avatar_s3_key)}
                    crop="fill"
                    width={32}
                    height={32}
                    alt="avatar"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-md font-semibold">
                    {profile?.first_name} {profile?.last_name}
                  </span>
                  <span className="text-sm text-black/60">
                    @{profile?.username}
                  </span>
                </div>
              </div>

              <div className="m-1 border-t border-black/20"></div>

              <div className="mx-1">
                <Link
                  href={`/account/${profile?.username}`}
                  className="block w-full rounded-md px-3 py-1.5 text-sm hover:bg-black/5"
                >
                  <FontAwesomeIcon icon={faUser} className="mr-1" />
                  My Profile
                </Link>

                {profile?.role === 'professional' && (
                  <Link
                    href="/upload"
                    className="block w-full rounded-md px-3 py-1.5 text-sm hover:bg-black/5"
                  >
                    <FontAwesomeIcon icon={faCloudArrowUp} className="mr-1" />
                    Upload Video
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="block w-full cursor-pointer rounded-md px-3 py-1.5 text-left text-sm hover:bg-black/5"
                >
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="mr-1"
                  />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
