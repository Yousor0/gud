'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CldImage } from 'next-cloudinary';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../app/(auth)/login';

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
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2"
      >
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

      {open && (
        <>
          {/* Backdrop to close on outside click */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full right-0 z-50 mt-2 w-44 rounded-md border border-black/10 bg-[#F5F0E7] shadow-md">
            <Link
              href={`/account/${profile?.username}`}
              className="block px-4 py-2 hover:bg-black/5"
              onClick={() => setOpen(false)}
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
        </>
      )}
    </div>
  );
}
