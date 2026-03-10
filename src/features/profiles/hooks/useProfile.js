'use client';

import { useEffect, useState } from 'react';
import {
  fetchProfileByUsername,
  fetchProfessionalByUserId,
  fetchUserVideos,
} from '../services/profileService';

export function useProfile(username) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!username) return;

    async function load() {
      setLoading(true);
      setNotFound(false);
      setProfile(null);

      try {
        const profileData = await fetchProfileByUsername(username);
        const [videos, professional] = await Promise.all([
          fetchUserVideos(profileData.user_id),
          profileData.role === 'professional'
            ? fetchProfessionalByUserId(profileData.user_id).catch(() => null)
            : Promise.resolve(null),
        ]);
        setProfile({
          ...profileData,
          videos,
          content_type: professional?.content_type ?? null,
          specialties: professional?.specialties ?? null,
          certifications: professional?.certifications ?? null,
          website_url: professional?.website_url ?? null,
          youtube_url: professional?.youtube_url ?? null,
          instagram_url: professional?.instagram_url ?? null,
          twitter_url: professional?.twitter_url ?? null,
        });
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [username]);

  function updateProfileCache(data) {
    setProfile((prev) => ({ ...prev, ...data }));
  }

  return { profile, loading, notFound, updateProfileCache };
}
