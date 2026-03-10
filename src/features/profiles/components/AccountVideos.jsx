'use client';

import { useEffect, useState } from 'react';
import { fetchUserVideos } from '../services/profileService';
import { CldImage } from 'next-cloudinary';
import { motion } from 'motion/react';

export default function AccountVideos({ profile }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!profile?.user_id) return;

    fetchUserVideos(profile.user_id)
      .then(setVideos)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [profile?.user_id]);

  if (loading) return <div>Loading videos...</div>;
  if (error) return <div>Error loading videos: {error}</div>;
  if (videos.length === 0) return <div>No videos yet.</div>;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Videos</h2>
      {console.log(videos)}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((video) => (
          <motion.div
            key={video.id}
            className="bg-bg-secondary aspect-video rounded-sm p-2"
          >
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
        ))}
      </div>
    </div>
  );
}
