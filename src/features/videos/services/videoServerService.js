import { createClient } from '../../../lib/supabase/server';

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
