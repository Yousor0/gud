'use client';

import { useParams, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faCreditCard,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const tiers = [
  {
    tierId: 1,
    tierName: 'Free',
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

export default function PaymentPage() {
  const { paymentId } = useParams();
  const router = useRouter();
  const tier = tiers.find((t) => t.tierId === Number(paymentId));

  const [form, setForm] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  if (!tier) {
    return (
      <section className="mx-auto flex w-auto max-w-7xl flex-col gap-10 px-5 pt-20">
        <h1 className="page-title text-center">Plan not found</h1>
        <p className="text-center text-gray-600">
          The selected plan does not exist.
        </p>
      </section>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      const digits = value.replace(/\D/g, '').slice(0, 16);
      const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
      setForm((prev) => ({ ...prev, cardNumber: formatted }));
      return;
    }

    if (name === 'expiry') {
      const digits = value.replace(/\D/g, '').slice(0, 4);
      const formatted =
        digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
      setForm((prev) => ({ ...prev, expiry: formatted }));
      return;
    }

    if (name === 'cvc') {
      const digits = value.replace(/\D/g, '').slice(0, 4);
      setForm((prev) => ({ ...prev, cvc: digits }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate with payment provider
    router.push('/account/subscription/manage');
  };

  return (
    <section className="mx-auto flex w-auto max-w-7xl flex-col gap-10 px-5 pt-30 pb-20">
      <div className="flex flex-col items-start justify-center gap-10 lg:flex-row">
        {/* Membership Card */}
        <div className="flex w-full flex-col rounded-lg border px-5 py-10 lg:max-w-sm">
          <div className="mt-5 mb-3 flex items-center justify-between">
            <h2 className="section-title">{tier.tierName}</h2>
            <p className="text-2xl text-gray-600">${tier.cost}/month</p>
          </div>

          <div className="border border-gray-600/30"></div>

          <ul className="mt-2 mb-5 flex-1 list-inside list-none">
            {tier.description.map((item, index) => (
              <li key={index} className="my-5">
                <FontAwesomeIcon icon={faCheck} /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Payment Form */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-5 rounded-lg border px-6 py-8 lg:max-w-md"
        >
          <h2 className="section-title flex items-center gap-2">
            <FontAwesomeIcon icon={faCreditCard} /> Payment Details
          </h2>

          <div className="border border-gray-600/30"></div>

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name on Card
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-[#9D4431] focus:ring-1 focus:ring-[#9D4431]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="cardNumber"
              className="text-sm font-medium text-gray-700"
            >
              Card Number
            </label>
            <input
              id="cardNumber"
              name="cardNumber"
              type="text"
              inputMode="numeric"
              required
              value={form.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              className="rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-[#9D4431] focus:ring-1 focus:ring-[#9D4431]"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <label
                htmlFor="expiry"
                className="text-sm font-medium text-gray-700"
              >
                Expiry Date
              </label>
              <input
                id="expiry"
                name="expiry"
                type="text"
                inputMode="numeric"
                required
                value={form.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                className="rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-[#9D4431] focus:ring-1 focus:ring-[#9D4431]"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <label
                htmlFor="cvc"
                className="text-sm font-medium text-gray-700"
              >
                CVC
              </label>
              <input
                id="cvc"
                name="cvc"
                type="text"
                inputMode="numeric"
                required
                value={form.cvc}
                onChange={handleChange}
                placeholder="123"
                className="rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-[#9D4431] focus:ring-1 focus:ring-[#9D4431]"
              />
            </div>
          </div>

          <div className="mt-2 border border-gray-600/30"></div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Total</span>
            <span className="text-lg font-semibold text-gray-900">
              ${tier.cost}/month
            </span>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-[#9D4431] px-5 py-3 font-semibold text-[#FAF7F3] shadow-sm duration-150 hover:bg-[#D07A64]"
          >
            {tier.cost === 0 ? 'Confirm Free Plan' : `Pay $${tier.cost}/month`}
          </button>

          <p className="flex items-center justify-center gap-1 text-xs text-gray-500">
            <FontAwesomeIcon icon={faLock} /> Your payment info is secure
          </p>
        </form>
      </div>
    </section>
  );
}
