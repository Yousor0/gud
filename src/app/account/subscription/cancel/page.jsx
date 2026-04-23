'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../../context/AuthContext';

const premiumFeatures = [
  'Everything in Free Plan Included',
  'Beginner-friendly workout guides',
  'Follow-along home workout videos',
  'General nutrition guides and healthy recipe ideas',
  'Educational content on fitness and wellness',
];

export default function CancelPage() {
  const { user, profile, refreshProfile } = useAuth();
  const router = useRouter();
  const [cancelling, setCancelling] = useState(false);

  if (profile && profile.role !== 'user_premium') {
    router.replace('/account/subscription/manage');
    return null;
  }

  async function handleConfirmCancel() {
    if (!user) return;
    setCancelling(true);
    const res = await fetch('/api/update-role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'user' }),
    });
    if (!res.ok) {
      setCancelling(false);
      return;
    }
    await refreshProfile();
    router.push('/account/subscription/manage');
  }

  return (
    <section className="mx-auto flex w-auto max-w-3xl flex-col gap-10 px-5 pt-30 pb-20">
      <div className="flex flex-col gap-6 rounded-lg border px-8 py-10">
        <div>
          <h1 className="page-title mb-2">Cancel Premium</h1>
          <p className="text-gray-500 text-sm">
            Are you sure you want to unsubscribe? You will lose access to all
            Premium features at the end of your billing period.
          </p>
        </div>

        <div className="border-b border-gray-600/30" />

        <div>
          <p className="mb-3 text-sm font-medium text-gray-700">
            You will lose access to:
          </p>
          <ul className="flex flex-col gap-3">
            {premiumFeatures.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                <FontAwesomeIcon icon={faCheck} className="text-gray-400 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-b border-gray-600/30" />

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/account/subscription/manage"
            className="rounded-md border border-[#9D4431] px-6 py-2 text-center text-sm font-semibold text-[#9D4431] duration-150 hover:bg-[#9D4431] hover:text-[#FAF7F3]"
          >
            Keep Premium
          </Link>
          <button
            onClick={handleConfirmCancel}
            disabled={cancelling}
            className="rounded-md bg-gray-700 px-6 py-2 text-sm font-semibold text-white duration-150 hover:bg-gray-600 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {cancelling ? 'Cancelling…' : 'Confirm Unsubscribe'}
          </button>
        </div>
      </div>
    </section>
  );
}
