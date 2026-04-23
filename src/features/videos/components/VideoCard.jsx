'use client';

import Image from 'next/image';
import { avatarUrl, thumbnailUrl } from '@/lib/mediaUrl';
import { getVideoRating } from '../services/videoService';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Fitness & Nutrition
const videoTypeStyles = {
  fitness: 'tag-fitness',
  nutrition: 'tag-nutrition',
};

// Difficulty
const tagStyles = {
  beginner: 'tag-beginner',
  intermediate: 'tag-intermediate',
  advanced: 'tag-advanced',
};

function viewCount(views) {
  if (views >= 1_000_000_000) {
    return (views / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  } else if (views >= 1_000_000) {
    return (views / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (views >= 1_000) {
    return (views / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return views.toString();
}

function formatViews(n) {
  return (n ?? 0).toLocaleString('en-US');
}

function formatDuration(seconds) {
  if (!seconds) return null;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function SearchVideoCard({ video }) {
  const router = useRouter();
  const displayName = video.profiles?.first_name
    ? `${video.profiles.first_name} ${video.profiles.last_name ?? ''}`.trim()
    : (video.profiles?.username ?? '');

  const [videoRating, setVideoRating] = useState(null);

  useEffect(() => {
    getVideoRating(video.id).then(setVideoRating);
  }, [video.id]);

  const videoTags = video.tags.slice(0, 10);

  const combinedVideoTags = [video.level, ...videoTags];

  return (
    <Link
      href={`watch/${video.id}`}
      prefetch={false}
      className="group border-bg-accent hover:bg-bg-accent/30 flex h-full flex-col gap-1 rounded-sm border p-3 shadow-2xs duration-150 hover:scale-102"
    >
      <div className="flex flex-1 flex-col gap-1">
        <div className="aspect-video overflow-hidden rounded-sm bg-gray-200">
          <Image
            src={thumbnailUrl(video.video_s3_key)}
            width={640}
            height={360}
            alt={`${video.title} thumbnail`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="line-clamp-2 text-sm leading-tight font-semibold">
            {video.title}
          </p>
          {video.description && (
            <p className="line-clamp-2 text-sm text-gray-500">
              {video.description}
            </p>
          )}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <div
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/account/${video.profiles?.username}`);
            }}
          >
            <Image
              src={avatarUrl(video.profiles?.avatar_public_id)}
              width={32}
              height={32}
              alt={displayName || 'User'}
              className="h-8 w-8 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            {(displayName && (
              <p className="text-text-primary text-sm">{displayName}</p>
            )) || (
              <p className="text-text-primary text-sm">displayName not found</p>
            )}
            {(video.profiles?.username && (
              <p
                className="hover:text-brand-primary-hover -mt-1 cursor-pointer text-sm text-gray-500"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/account/${video.profiles?.username}`);
                }}
              >
                {video.profiles?.username}
              </p>
            )) || (
              <p className="-mt-1 text-sm text-gray-500"> username not found</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap gap-1 pt-2">
        {/* Video Ratings */}
        {videoRating !== null && (
          <span className="tag gap-1 bg-yellow-500 text-white">
            <FontAwesomeIcon icon={faStar} className="h-3 w-3" />
            {(videoRating * 5).toFixed(1)}
          </span>
        )}

        {/* Video Type */}
        {video.type && (
          <span
            className={`tag ${videoTypeStyles[video.type] ?? 'tag-border'}`}
          >
            {video.type.charAt(0).toUpperCase() + video.type.slice(1)}
          </span>
        )}

        {/* Video Tags */}
        {combinedVideoTags.map((tag) => (
          <span key={tag} className={`tag ${tagStyles[tag] ?? 'tag-border'}`}>
            {tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ')}
          </span>
        ))}
      </div>

      <span className="text-text-accent mt-auto pt-4 text-xs">
        {viewCount(video.views)} views
      </span>
    </Link>
  );
}

export function ProfileVideoCard({ video }) {
  const videoTags = video.tags.slice(0, 10);

  const combinedVideoTags = [video.level, ...videoTags];

  const [videoRating, setVideoRating] = useState(null);

  useEffect(() => {
    getVideoRating(video.id).then(setVideoRating);
  }, [video.id]);

  return (
    <Link
      href={`/watch/${video.id}`}
      prefetch={false}
      className="group border-bg-accent hover:bg-bg-accent/30 flex h-full flex-col gap-1 rounded-sm border p-3 shadow-2xs duration-150 hover:scale-102"
    >
      <div className="aspect-video overflow-hidden rounded-sm bg-gray-200">
        <Image
          src={thumbnailUrl(video.video_s3_key)}
          width={640}
          height={360}
          alt={`${video.title} thumbnail`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mb-3 flex flex-col gap-1">
        <p className="2 text-sm leading-tight font-semibold">{video.title}</p>
        {video.description && (
          <p className="line-clamp-2 text-sm text-gray-500">
            {video.description}
          </p>
        )}
      </div>

      {video.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {/* Video Ratings */}
          {videoRating !== null && (
            <span className="tag tag-rating">
              <FontAwesomeIcon icon={faStar} className="h-3 w-3" />
              {(videoRating * 5).toFixed(1)}
            </span>
          )}

          {/* Video Type */}
          {video.type && (
            <span
              className={`tag ${videoTypeStyles[video.type] ?? 'tag-border'}`}
            >
              {video.type.charAt(0).toUpperCase() + video.type.slice(1)}
            </span>
          )}

          {/* Video Tags */}
          {combinedVideoTags.map((tag) => (
            <span key={tag} className={`tag ${tagStyles[tag] ?? 'tag-border'}`}>
              {tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ')}
            </span>
          ))}
        </div>
      )}

      <span className="text-text-accent mt-auto pt-4 text-xs">
        {viewCount(video.views)} views
      </span>
    </Link>
  );
}

export function SidebarVideoCard({ video }) {
  return (
    <a
      href={`/watch/${video.id}`}
      className="group hover:bg-bg-accent/30 -ml-1 flex gap-2 rounded-md p-2 duration-150"
    >
      <div className="relative aspect-video w-40 flex-shrink-0 overflow-hidden rounded-sm bg-gray-200">
        <Image
          src={thumbnailUrl(video.video_s3_key)}
          width={320}
          height={180}
          alt={`${video.title} thumbnail`}
          className="h-full w-full object-cover"
        />
        {formatDuration(video.duration_seconds) && (
          <span className="absolute right-1 bottom-1 rounded bg-black/80 px-1 py-0.5 text-xs font-medium text-white">
            {formatDuration(video.duration_seconds)}
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <p className="line-clamp-2 text-sm leading-tight font-semibold">
          {video.title}
        </p>
        {(video.profiles?.first_name || video.profiles?.last_name) && (
          <p className="text-text-primary text-xs">
            {video.profiles.first_name} {video.profiles.last_name}
          </p>
        )}
        <p className="text-text-secondary text-xs">
          {formatViews(video.views)} views
        </p>
      </div>
    </a>
  );
}
