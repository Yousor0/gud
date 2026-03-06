'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CldImage } from 'next-cloudinary';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../features/auth/services/authService';
import { motion, AnimatePresence } from 'motion/react';

export default function UserMenu() {
  const { profile } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push('/');
    router.refresh();
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

        <span className="font-medium">
          {profile?.first_name} {profile?.last_name}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.15 }}
          >
            <div className="absolute top-full right-0 z-50 mt-2 w-44 rounded-md border border-black/10 bg-[#F5F0E7] shadow-md">
              <Link
                href={`/account/${profile?.username}`}
                className="block px-4 py-2 hover:bg-black/5"
              >
                My Profile
              </Link>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-black/5"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
