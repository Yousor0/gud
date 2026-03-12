import { createClient } from '../../../lib/supabase/client';

export async function getAllVideos() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('videos')
    .select(`*, profiles(username, avatar_public_id)`)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getAllVideosByUser(userId) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('user_Id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getVideoRating(videoId) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('video_ratings')
    .select('rating')
    .eq('video_id', videoId);

  if (error) throw new Error(error.message);
  if (!data || data.length === 0) return null;

  const avg = data.reduce((sum, row) => sum + row.rating, 0) / data.length;
  return avg / 5;
}
