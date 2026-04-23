'use client';

import Link from 'next/link';
import Button from '../../../../components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../../context/AuthContext';

const tiers = [
  {
    tierId: 1,
    tierName: 'Free',
    roleValue: 'user',
    cost: 0,
    description: [
      'Beginner-friendly workout guides',
      'Follow-along home workout videos',
      'General nutrition guides and healthy recipe ideas',
      'Educational content on fitness and wellness',
    ],
  },
  {
    tierId: 2,
    tierName: 'Premium',
    roleValue: 'user_premium',
    cost: 30,
    description: [
      'Everything in Free Plan Included',
      'Beginner-friendly workout guides',
      'Follow-along home workout videos',
      'General nutrition guides and healthy recipe ideas',
      'Educational content on fitness and wellness',
    ],
  },
];

function Manage() {
  const { profile } = useAuth();
  const isPremium = profile?.role === 'user_premium';
  const currentRoleValue = isPremium ? 'user_premium' : 'user';

  return (
    <section className="mx-auto flex w-auto max-w-7xl flex-col gap-10 px-5 pt-20 pb-20">
      <h1 className="page-title text-center">Manage Subscription</h1>

      <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-stretch">
        {tiers.map((tier) => {
          const isCurrentTier = tier.roleValue === currentRoleValue;

          return (
            <div
              key={tier.tierId}
              className={`bg-bg-secondary flex flex-col rounded-lg px-5 py-10 align-middle shadow-md relative${isCurrentTier ? ' ring-2 ring-[#9D4431]' : ' border-bg-accent'}`}
            >
              {isCurrentTier && (
                <span className="absolute top-3 right-3 rounded-full bg-[#9D4431] px-3 py-1 text-xs font-semibold text-[#FAF7F3]">
                  Current Plan
                </span>
              )}

              <div className="mt-5 mb-3 flex items-center justify-between">
                <h2 className="section-title">{tier.tierName}</h2>
                <p className="text-2xl text-gray-600">${tier.cost}/month</p>
              </div>

              <div className="border-b border-gray-600/30"></div>

              <ul className="mt-2 mb-5 flex-1 list-inside list-none">
                {tier.description.map((item, index) => (
                  <li key={index} className="my-5">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-brand-primary"
                    />{' '}
                    {item}
                  </li>
                ))}
              </ul>

              {isCurrentTier ? (
                <div className="block w-full cursor-default rounded-md border border-gray-300 px-5 py-2 text-center text-sm font-medium text-gray-400 select-none">
                  Current Plan
                </div>
              ) : tier.roleValue === 'user_premium' ? (
                <Button
                  text="Upgrade to Premium"
                  className="block w-full text-center"
                  href={`/account/subscription/payment/${tier.tierId}`}
                />
              ) : null}
            </div>
          );
        })}
      </div>

      {isPremium && (
        <p className="text-center text-sm text-gray-500">
          Want to cancel?{' '}
          <Link
            href="/account/subscription/cancel"
            className="text-brand-primary underline"
          >
            Unsubscribe from Premium
          </Link>
        </p>
      )}
    </section>
  );
}

export default Manage;
