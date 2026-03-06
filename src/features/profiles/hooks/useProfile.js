'use client';

import { useEffect, useState } from 'react';
import {
  fetchProfileByUsername,
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
        const videos = await fetchUserVideos(profileData.id);
        setProfile({ ...profileData, videos });
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
