'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import { fetchProfessionalByUserId } from '../services/profileService';

const CONTENT_TYPE_COLORS = {
  fitness: 'tag-fitness',
  nutrition: 'tag-nutrition',
};

export default function AuthorSidebarCard({ userId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!userId) return;
    fetchProfessionalByUserId(userId)
      .then(setData)
      .catch(() => null);
  }, [userId]);

  if (!data) return null;

  return (
    <Link
      href={`/account/${data.username}`}
      className="border-bg-accent hover:bg-bg-accent/10 flex flex-col gap-3 rounded-md border p-4 shadow-sm duration-100"
    >
      <div className="gap border-bg-accent flex flex-col gap-2 border-b pb-3">
        <div className="flex flex-row items-center gap-3">
          {data.avatar_public_id && (
            <CldImage
              src={data.avatar_public_id}
              width={56}
              height={56}
              alt={data.username}
              className="h-12 w-12 rounded-full object-cover"
            />
          )}

          <div>
            {(data.first_name || data.last_name) && (
              <p className="font-semibold">
                {data.first_name} {data.last_name}
              </p>
            )}
            {data.username && (
              <p className="text-sm text-gray-500">@{data.username}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 text-center">
          {data.role === 'professional' && (
            <span className="tag tag-primary">Professional</span>
          )}
          {data.content_type && (
            <span
              className={`${CONTENT_TYPE_COLORS[data.content_type] ?? 'tag-primary'} tag`}
            >
              {data.content_type
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </span>
          )}
        </div>
      </div>

      {data.specialties?.length > 0 && (
        <div>
          <p className="label-emphasis text-text-primary mb-1 uppercase">
            Specialties
          </p>
          <div className="flex flex-wrap gap-1">
            {data.specialties.map((s, i) => (
              <span
                key={i}
                className="tag tag-border hover:bg-brand-primary hover:text-beige duration-100 ease-in"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.certifications?.length > 0 && (
        <div>
          <p className="label-emphasis text-text-primary mb-1 uppercase">
            Certifications
          </p>
          <div className="flex flex-wrap gap-1">
            {data.certifications.map((c, i) => (
              <span
                key={i}
                className="tag bg-bg-accent/50 tag-border text-black"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
    </Link>
  );
}
