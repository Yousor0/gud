'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { CldImage, getCldImageUrl } from 'next-cloudinary';
import VideoPlayer from '../../../features/videos/components/VideoPlayer';
import { SidebarVideoCard } from '../../../features/videos/components/VideoCard';
import CommentSection from '../../../features/comments/components/CommentSection';

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

function getVideoUrl(publicId) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${publicId}`;
}

function formatViews(n) {
  return (n ?? 0).toLocaleString('en-US');
}

function formatLikes(n) {
  if (n >= 1_000_000)
    return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return (n ?? 0).toString();
}

const CONTENT_TYPE_COLORS = {
  fitness: 'bg-blue-two',
  nutrition: 'bg-green-two',
  mental_health: 'bg-[#9d6cb2]',
};

export default function MediaPageContent({
  video,
  relatedVideos,
  comments,
  professional,
}) {
  const profile = video.profiles;
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const descRef = useRef(null);

  useEffect(() => {
    if (!descriptionExpanded && descRef.current) {
      setIsClamped(descRef.current.scrollHeight > descRef.current.clientHeight);
    }
  }, [video.description, descriptionExpanded]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column: player + info + comments */}
        <div className="lg:col-span-2">
          <VideoPlayer
            key={video.id}
            src={getVideoUrl(video.cloudinary_public_id)}
            poster={
              video.thumbnail_public_id
                ? getCldImageUrl({ src: video.thumbnail_public_id })
                : undefined
            }
            knownDuration={video.duration_seconds}
          />

          <h1 className="mt-4 text-xl font-bold">{video.title}</h1>

          {video.tags?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {video.tags.map((tag, i) => (
                <Link
                  key={i}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="hover:bg-brand-primary-hover border-bg-accent rounded-full px-3 py-1 text-xs font-medium text-gray-600 duration-150"
                >
                  {tag.charAt(0).toUpperCase() +
                    tag.slice(1).replace(/-/g, ' ')}
                </Link>
              ))}
            </div>
          )}

          <div className="mt-3 flex items-center justify-between">
            <Link
              href={`/account/${profile?.username}`}
              className="flex items-center gap-3 hover:opacity-80"
            >
              {profile?.avatar_public_id && (
                <CldImage
                  src={profile.avatar_public_id}
                  width={40}
                  height={40}
                  alt={profile.username}
                  className="h-10 w-10 rounded-full object-cover"
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
            </Link>

            <div className="flex gap-4 text-sm text-gray-500">
              <span>{formatViews(video.views)} views</span>
              <span>{formatLikes(video.likes_count)} likes</span>
              {video.level && <span>{video.level}</span>}
            </div>
          </div>

          {video.description && (
            <div className="mt-4 rounded-md bg-gray-100 p-3 text-gray-700">
              <p
                ref={descRef}
                className={descriptionExpanded ? '' : 'line-clamp-3'}
              >
                {video.description}
              </p>
              {(isClamped || descriptionExpanded) && (
                <button
                  onClick={() => setDescriptionExpanded((prev) => !prev)}
                  className="mt-1 w-full text-left text-sm font-semibold text-[#9D4431] duration-150 hover:text-[#D07A64]"
                >
                  {descriptionExpanded ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>
          )}

          <CommentSection videoId={video.id} initialComments={comments} />
        </div>

        {/* Right column: author card + related videos */}
        <div className="flex flex-col gap-4">
          <Link
            href={`/account/${profile?.username}`}
            className="flex flex-col gap-3 rounded-md border p-4 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              {profile?.avatar_public_id && (
                <CldImage
                  src={profile.avatar_public_id}
                  width={56}
                  height={56}
                  alt={profile.username}
                  className="h-14 w-14 rounded-full object-cover"
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
            </div>

            <div className="flex flex-wrap gap-2">
              {profile?.role === 'professional' && (
                <span className="bg-brand-primary text-bg-primary rounded-full px-3 py-1 text-xs font-medium">
                  Professional
                </span>
              )}
              {professional?.content_type && (
                <span
                  className={`${CONTENT_TYPE_COLORS[professional.content_type] ?? 'bg-bg-accent'} rounded-full px-3 py-1 text-xs font-medium text-white`}
                >
                  {professional.content_type
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              )}
            </div>

            {professional?.specialties?.length > 0 && (
              <div>
                <p className="mb-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Specialties
                </p>
                <div className="flex flex-wrap gap-2">
                  {professional.specialties.map((s, i) => (
                    <span
                      key={i}
                      className="hover:bg-brand-primary-hover text-black/80; border-accent hover:bg-brand-primary-hover rounded-full border px-2 py-0.5 text-xs hover:text-white"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {professional?.certifications?.length > 0 && (
              <div>
                <p className="mb-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Certifications
                </p>
                <div className="flex flex-wrap gap-2">
                  {professional.certifications.map((c, i) => (
                    <span
                      key={i}
                      className="bg-brand-primary text-beige rounded-full px-3 py-1 text-xs shadow-sm"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Link>

          {relatedVideos.length > 0 && (
            <div className="flex flex-col gap-2">
              {relatedVideos.map((v) => (
                <SidebarVideoCard key={v.id} video={v} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
