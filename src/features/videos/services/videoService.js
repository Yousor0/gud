import { createClient } from '../../../lib/supabase/client';

export async function getAllVideos() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('videos')
    .select(`*, profiles(username, avatar_s3_key)`)
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

export async function getVideoById(video_id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('videos')
    .select(`*, profiles(username, avatar_s3_key, first_name, last_name, role)`)
    .eq('id', video_id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getVideosByType(type, excludeId) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('videos')
    .select(`*, profiles(username, avatar_s3_key, first_name, last_name)`)
    .eq('type', type)
    .neq('id', excludeId)
    .order('created_at', { ascending: false })
    .limit(10);

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
