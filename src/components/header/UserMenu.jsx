'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CldImage } from 'next-cloudinary';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../features/auth/services/authService';
import { motion, AnimatePresence } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faArrowRightFromBracket,
  faChevronDown,
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

  if (mobile) {
    return (
      <div className="w-full">
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-black/5"
        >
          <CldImage
            src={profile?.avatar_public_id || 'default-avatar_m0m2pe'}
            crop="fill"
            width={36}
            height={36}
            alt="avatar"
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="flex flex-1 flex-col items-start leading-tight">
            <span className="text-sm font-semibold">
              {profile?.first_name} {profile?.last_name}
            </span>
            <span className="text-xs text-black/60">{profile?.username}</span>
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
        <CldImage
          src={profile?.avatar_public_id || 'default-avatar_m0m2pe'}
          width={36}
          height={36}
          alt="avatar"
          className="aspect-square rounded-full object-cover"
        />
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
                <CldImage
                  src={profile?.avatar_public_id || 'default-avatar_m0m2pe'}
                  crop="fill"
                  width={32}
                  height={32}
                  alt="avatar"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-md font-semibold">
                    {profile?.first_name} {profile?.last_name}
                  </span>
                  <span className="text-sm text-black/60">
                    {profile?.username}
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
