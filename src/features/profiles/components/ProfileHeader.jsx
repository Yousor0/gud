'use client';

import Image from 'next/image';
import { avatarUrl } from '@/lib/mediaUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'motion/react';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram,
  faYoutube,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';

const CONTENT_TYPE_COLORS = {
  fitness: 'tag-fitness',
  nutrition: 'tag-nutrition',
};

export default function ProfileHeader({ profile, isOwner, onEditClick }) {
  const isProfessional = profile.role === 'professional';
  const isPremium = profile.role === 'user_premium';

  console.log(isPremium);

  const socials = isProfessional && (
    <div className="bg-sec flex flex-wrap items-center gap-1">
      {profile.website_url && (
        <a
          href={profile.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-primary-hover text-text-accent mr-2 rounded text-2xl duration-150 hover:scale-105"
        >
          <FontAwesomeIcon icon={faGlobe} />
        </a>
      )}
      {profile.youtube_url && (
        <a
          href={profile.youtube_url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-primary-hover text-text-accent mr-2 rounded text-2xl duration-150 hover:scale-105"
        >
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      )}
      {profile.instagram_url && (
        <a
          href={profile.instagram_url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-primary-hover text-text-accent mr-2 rounded text-2xl duration-150 hover:scale-105"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      )}
      {profile.twitter_url && (
        <a
          href={profile.twitter_url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-primary-hover text-text-accent mr-2 rounded text-2xl duration-150 hover:scale-105"
        >
          <FontAwesomeIcon icon={faXTwitter} />
        </a>
      )}
    </div>
  );

  return (
    <div className="w-full">
      {/* Mobile: centered stack */}
      <div className="relative flex flex-col items-center gap-5 md:hidden">
        {isOwner && (
          <div className="absolute top-0 right-0">
            {isOwner && (
              <motion.button
                type="button"
                onClick={onEditClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                style={{ originX: 0.5, originY: 0.5 }}
                className="border-bg-accent hover:bg-bg-accent shrink-0 rounded-md border px-3 py-2 text-sm"
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </motion.button>
            )}
          </div>
        )}

        <Image
          src={avatarUrl(profile.avatar_s3_key)}
          width={120}
          height={120}
          alt={`${profile.username} avatar`}
          className="mt-5 aspect-square rounded-full object-cover"
        />

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <h1 className="section-title">
              {profile.first_name} {profile.last_name}
            </h1>
            <p className="text-text-accent text-sm">@{profile.username}</p>
          </div>
          <div className="flex flex-row gap-2">
            {/* Profesional Tag */}
            {isProfessional && (
              <span className="bg-brand-primary text-bg-primary rounded-full px-3 py-1 text-xs font-medium">
                Professional
              </span>
            )}

            {/* Premium User Tag */}
            {isPremium && (
              <span className="text-bg-primary rounded-full bg-amber-400 px-3 py-1 text-xs font-medium">
                Premium
              </span>
            )}

            {profile.content_type && (
              <span
                className={`${CONTENT_TYPE_COLORS[profile.content_type] ?? 'bg-bg-accent'} items-center rounded-full px-3 py-1 text-xs font-medium text-white`}
              >
                {profile.content_type
                  .replace(/_/g, ' ')
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </span>
            )}
          </div>
          {socials}
          <div>
            <h2 className="mb-2 text-center text-sm font-semibold tracking-wide text-gray-500 uppercase md:text-left">
              Biography
            </h2>
            {profile.bio && (
              <p className="min-h-40 w-full rounded-md bg-[#E3DBCF] p-2 text-center text-sm leading-relaxed">
                {profile.bio}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Desktop: avatar left, info center, edit button top-right */}
      <div className="hidden md:flex md:flex-col md:gap-3">
        <div className="flex items-start gap-6">
          <div>
            <Image
              src={avatarUrl(profile.avatar_s3_key)}
              width={120}
              height={120}
              alt={`${profile.username} avatar`}
              className="aspect-square shrink-0 rounded-full object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <h1 className="section-title">
                  {profile.first_name} {profile.last_name}
                </h1>
                <p className="text-text-accent text-sm">@{profile.username}</p>
              </div>
              {isOwner && (
                <motion.button
                  type="button"
                  onClick={onEditClick}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.99 }}
                  style={{ originX: 0.5, originY: 0.5 }}
                  className="border-bg-accent hover:bg-bg-accent shrink-0 rounded-md border px-4 py-2 text-sm"
                >
                  <FontAwesomeIcon icon={faPenToSquare} className="mr-1" />
                  Edit Profile
                </motion.button>
              )}
            </div>
            <div className="flex flex-row gap-2">
              {isProfessional && (
                <span className="bg-brand-primary text-bg-primary rounded-full px-3 py-1 text-xs font-medium">
                  Professional
                </span>
              )}
              {isPremium && (
                <span className="rounded-full bg-yellow-600 px-3 py-1 text-xs font-medium text-white">
                  Premium
                </span>
              )}
              {profile.content_type && (
                <span
                  className={`${CONTENT_TYPE_COLORS[profile.content_type] ?? 'bg-bg-accent'} tag`}
                >
                  {profile.content_type
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              )}
            </div>
          </div>
        </div>
        {socials}

        <div>
          {profile.bio && (
            <>
              <h2 className="mb-2 text-center text-sm font-semibold tracking-wide text-gray-500 uppercase md:text-left">
                Biography
              </h2>
              <p className="leading-relax text-md text-secondary min-h-30 w-full rounded-md bg-[#E3DBCF] p-2">
                {profile.bio}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
