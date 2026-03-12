'use client';

import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

const CONTENT_TYPE_COLORS = {
  fitness: 'tag-fitness',
  nutrition: 'tag-nutrition',
};

export default function ProfessionalResults({ professionals }) {
  if (professionals.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {professionals.map((pro) => {
        const displayName = pro.first_name
          ? `${pro.first_name} ${pro.last_name ?? ''}`.trim()
          : pro.username;
        const tags = [
          ...(pro.specialties ?? []),
          ...(pro.certifications ?? []),
        ];

        return (
          <Link
            key={pro.user_id}
            href={`/account/${pro.username}`}
            prefetch={false}
            className="border-bg-accent hover:bg-bg-accent/30 flex flex-col gap-3 rounded-sm border p-4 shadow-2xs duration-150 hover:scale-102"
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <CldImage
                  src={pro.avatar_public_id || 'default-avatar_m0m2pe'}
                  width={40}
                  height={40}
                  alt={`${pro.username} avatar`}
                  className="aspect-square rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <p className="text-sm leading-tight font-semibold">
                    {displayName}
                  </p>
                  <p className="text-text-accent text-xs">@{pro.username}</p>
                </div>
              </div>

              {pro.content_type && (
                <span
                  className={`${CONTENT_TYPE_COLORS[pro.content_type] ?? 'border-bg-accent border text-black/80'} tag self-start`}
                >
                  {pro.content_type.charAt(0).toUpperCase() +
                    pro.content_type.slice(1)}
                </span>
              )}
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.slice(0, 5).map((tag, i) => (
                  <span
                    key={i}
                    className="border-bg-accent rounded-full border px-2 py-0.5 text-xs text-black/80"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 5 && (
                  <span className="text-text-accent text-xs">
                    +{tags.length - 5} more
                  </span>
                )}
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
