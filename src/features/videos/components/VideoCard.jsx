'use client';

import { CldImage } from 'next-cloudinary';
import Link from 'next/link';

export function SearchVideoCard({ video }) {
  const displayName = video.profiles?.first_name
    ? `${video.profiles.first_name} ${video.profiles.last_name ?? ''}`.trim()
    : (video.profiles?.username ?? '');

  return (
    <Link
      href={`/media/${video.id}`}
      prefetch={false}
      className="group border-bg-accent hover:bg-bg-accent/30 flex h-full flex-col gap-1 rounded-sm border p-3 shadow-2xs duration-150 hover:scale-102"
    >
      <div className="flex flex-1 flex-col gap-1">
        <div className="aspect-video overflow-hidden rounded-sm bg-gray-200">
          <CldImage
            src={video.thumbnail_public_id || 'default_thumbnail'}
            width={640}
            height={360}
            alt={`${video.title} thumbnail`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm leading-tight font-semibold">{video.title}</p>
          {video.description && (
            <p className="line-clamp-2 text-sm text-gray-500">
              {video.description}
            </p>
          )}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <CldImage
            src={video.profiles?.avatar_public_id || 'default-avatar_m0m2pe'}
            width={32}
            height={32}
            alt={displayName || 'User'}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="flex flex-col">
            {displayName && (
              <p className="text-text-primary text-sm">{displayName}</p>
            )}
            {video.profiles?.username && (
              <p className="text-sm text-gray-500">
                {video.profiles?.username}
              </p>
            )}
          </div>
        </div>
      </div>

      {video.tags?.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1 pt-2">
          {video.tags.map((tag) => (
            <span
              key={tag}
              className="bg-brand-primary rounded-full px-2 py-0.5 text-xs text-white/90"
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ')}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

export function ProfileVideoCard({ video }) {
  return (
    <Link
      href={`/media/${video.id}`}
      prefetch={false}
      className="group border-bg-accent hover:bg-bg-accent/30 flex h-full flex-col gap-1 rounded-sm border p-3 shadow-2xs duration-150 hover:scale-102"
    >
      <div className="aspect-video overflow-hidden rounded-sm bg-gray-200">
        <CldImage
          src={video.thumbnail_public_id || 'default_thumbnail'}
          width={640}
          height={360}
          alt={`${video.title} thumbnail`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mb-3 flex flex-col gap-1">
        <p className="text-sm leading-tight font-semibold">{video.title}</p>
        {video.description && (
          <p className="line-clamp-2 text-sm text-gray-500">
            {video.description}
          </p>
        )}
      </div>

      {video.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {video.tags.map((tag) => (
            <span
              key={tag}
              className="bg-brand-primary rounded-full px-2 py-0.5 text-xs text-white/90"
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ')}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
