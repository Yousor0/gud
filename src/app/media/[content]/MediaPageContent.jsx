'use client';

import { CldImage, CldVideoPlayer, getCldImageUrl } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';

export default function MediaPageContent({ video }) {
  const profile = video.profiles;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">{video.title}</h1>

      <CldVideoPlayer
        id={`player-${video.id}`}
        src={video.cloudinary_public_id}
        width={1280}
        height={720}
        className="w-full rounded-sm"
        poster={video.thumbnail_public_id ? getCldImageUrl({ src: video.thumbnail_public_id }) : undefined}
        controls
      />

      <div className="mt-6 flex items-center gap-4">
        {profile?.avatar_public_id && (
          <CldImage
            src={profile.avatar_public_id}
            width={48}
            height={48}
            alt={profile.username}
            className="h-12 w-12 rounded-full object-cover"
          />
        )}
        <div>
          {(profile?.first_name || profile?.last_name) && (
            <p className="font-semibold">
              {profile.first_name} {profile.last_name}
            </p>
          )}
          {profile?.username && (
            <p className="text-sm text-gray-500">@{profile.username}</p>
          )}
        </div>

        <div className="ml-auto flex gap-6 text-sm text-gray-500">
          <span>{video.views} views</span>
          <span>{video.likes_count} likes</span>
          {video.level && <span>{video.level}</span>}
        </div>
      </div>

      {video.description && (
        <p className="mt-4 text-gray-700">{video.description}</p>
      )}
    </div>
  );
}
