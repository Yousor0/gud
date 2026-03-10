'use client';

import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { motion } from 'motion/react';

export function SearchVideoCard({ video }) {
  return (
    <Link
      href={`/media/${video.id}`}
      className="group flex flex-col gap-2 rounded-md p-2 duration-150 hover:bg-black/5"
    >
      <div className="aspect-video overflow-hidden rounded-sm bg-gray-200">
        <CldImage
          src={video.thumbnail_public_id || 'default_thumbnail'}
          width={640}
          height={360}
          alt={`${video.title} thumbnail`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center gap-3">
        {video.profiles?.avatar_public_id && (
          <CldImage
            src={video.profiles.avatar_public_id}
            width={36}
            height={36}
            alt={video.profiles.username}
            className="h-9 w-9 rounded-full object-cover"
          />
        )}
        <div className="flex flex-col">
          <p className="leading-tight font-semibold">{video.title}</p>
          {(video.profiles?.first_name ||
            video.profiles?.last_name ||
            video.profiles?.username) && (
            <p className="text-sm text-gray-500">
              {video.profiles?.first_name} {video.profiles?.last_name}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export function ProfileVideoCard({ video }) {
  return (
    <motion.div className="bg-bg-secondary aspect-video rounded-sm p-2">
      <CldImage
        src={video.thumbnail_public_id || 'default_thumbnail'}
        width={1280}
        height={720}
        alt={`${video.title} thumbnail`}
        loading="eager"
        className="h-full w-full rounded-sm object-cover"
      />
      <p className="font-medium">{video.title}</p>
    </motion.div>
  );
}
