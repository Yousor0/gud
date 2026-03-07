'use client';

import { CldImage } from 'next-cloudinary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'motion/react';

export default function ProfileHeader({ profile, isOwner, onEditClick }) {
  const isProfessional = profile.role === 'professional';

  return (
    <div className="flex items-start gap-6">
      <CldImage
        src={profile.avatar_public_id || 'default-avatar_m0m2pe'}
        width={120}
        height={120}
        alt={`${profile.username} avatar`}
        className="aspect-square rounded-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="section-title">
            {profile.first_name} {profile.last_name}
          </h1>
          {isProfessional && (
            <span className="bg-brand-primary text-bg-primary rounded-full px-3 py-1 text-xs font-medium">
              Professional
            </span>
          )}
        </div>
        <p className="text-text-accent text-sm">@{profile.username}</p>
        {profile.bio && <p className="mt-1 max-w-xl text-sm">{profile.bio}</p>}

        {isProfessional && (
          <div className="mt-2 flex flex-wrap gap-3">
            {profile.website_url && (
              <a
                href={profile.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary text-sm hover:underline"
              >
                Website
              </a>
            )}
            {profile.youtube_url && (
              <a
                href={profile.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary text-sm hover:underline"
              >
                YouTube
              </a>
            )}
            {profile.instagram_url && (
              <a
                href={profile.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary text-sm hover:underline"
              >
                Instagram
              </a>
            )}
          </div>
        )}
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
  );
}
