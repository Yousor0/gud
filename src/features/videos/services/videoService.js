import { createClient } from '../../../lib/supabase/server';

export async function getAllVideos() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('videos')
    .select(`*, profiles(username, avatar_public_id)`)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getAllVideosByUser(userId) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('user_Id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}
