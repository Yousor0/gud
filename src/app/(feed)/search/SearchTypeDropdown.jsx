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
    <select value={currentType} onChange={handleChange} className="dropdown">
      <option value="videos">Videos</option>
      <option value="professionals">Professionals</option>
    </select>
  );
}
