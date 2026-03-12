'use client';

import { useRouter } from 'next/navigation';

export default function SearchTypeDropdown({ currentType, query }) {
  const router = useRouter();

  function handleChange(e) {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    params.set('type', e.target.value);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <select
      value={currentType}
      onChange={handleChange}
      className="border-bg-accent bg-bg-primary text-text-primary w-fit rounded-md border px-3 py-2 text-sm"
    >
      <option value="videos">Videos</option>
      <option value="professionals">Professionals</option>
    </select>
  );
}
