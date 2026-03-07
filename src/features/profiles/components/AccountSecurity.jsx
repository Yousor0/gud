'use client';

import { useState } from 'react';
import Button from '../../../components/ui/Button';

export default function AccountSecurity({ profile }) {
  const [formData, setFormData] = useState({
    email: profile.email || '',
    password: profile.password || '',
  });

  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  function setField(key, value) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Account Security */}
      <div className="bg-bg-secondary rounded-sm p-5">
        <h2 className="mb-4 text-lg font-semibold">Account Security</h2>
        <div className="flex flex-col gap-4">
          <div>
            <h4 className="mb-1 text-sm font-medium">Email</h4>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder={profile.email}
                className="border-bg-accent hover:border-brand-primary-hover focus:border-brand-primary focus:ring-brand-primary-hover min-w-60 rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
              />
              <Button text="Edit Email" onSubmit />
            </div>
          </div>
          <div>
            <h4 className="mb-1 text-sm font-medium">Password</h4>
            <div className="flex items-center gap-3">
              <input
                type="password"
                placeholder="••••••••"
                className="border-bg-accent hover:border-brand-primary-hover focus:border-brand-primary focus:ring-brand-primary-hover min-w-60 rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
              />
              <Button text="Edit Password" />
            </div>
          </div>
        </div>
      </div>

      {/* Membership */}
      <div className="bg-bg-secondary rounded-sm p-5">
        <h2 className="mb-2 text-lg font-semibold">My Membership</h2>
        <p className="mb-4 text-sm">Premium Plan</p>
        <Button text="Manage Membership" href="/account/subscription/manage" />
      </div>

      {/* Devices */}
      <div className="bg-bg-secondary col-span-full rounded-sm p-5">
        <h2 className="text-lg font-semibold">Devices</h2>
        <p className="mb-2 text-sm text-gray-500">
          Connect your device to optimize your experience
        </p>
        <Button text="Add New Device" />
      </div>

      {/* Delete Account */}
      <div className="flex justify-end">
        <Button text="Delete Account" variant="delete" />
      </div>
    </div>
  );
}
