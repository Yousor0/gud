'use client';

import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

const CONTENT_TYPE_COLORS = {
  fitness: 'bg-blue-two',
  nutrition: 'bg-green-two',
};

export default function ExploreProCard({ pro }) {
  const displayName = pro.first_name
    ? `${pro.first_name} ${pro.last_name ?? ''}`.trim()
    : pro.username;

  const tags = [...(pro.specialties ?? []), ...(pro.certifications ?? [])];

  return (
    <Link
      href={`/account/${pro.username}`}
      prefetch={false}
      className="border-bg-accent hover:bg-bg-accent/30 flex flex-col gap-2 rounded-sm border p-3 shadow-2xs duration-150 hover:scale-102"
    >
      <div className="flex items-center gap-3">
        <CldImage
          src={pro.avatar_public_id || 'default-avatar_m0m2pe'}
          width={40}
          height={40}
          alt={`${pro.username} avatar`}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{displayName}</p>
          <p className="text-text-accent truncate text-xs">@{pro.username}</p>
        </div>
      </div>

      {pro.content_type && (
        <span
          className={`${CONTENT_TYPE_COLORS[pro.content_type] ?? 'bg-bg-accent'} w-fit rounded-full px-2 py-0.5 text-xs font-medium text-white`}
        >
          {pro.content_type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
        </span>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 4).map((tag, i) => (
            <span
              key={i}
              className="border-bg-accent rounded-full border px-2 py-0.5 text-xs text-black/80"
            >
              {tag}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="text-text-accent text-xs">+{tags.length - 4} more</span>
          )}
        </div>
      )}
    </Link>
  );
}
