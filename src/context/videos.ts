import { createClient } from '../utils/supabase/server';

export async function getAllVideos() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('videos')
    .select(`*, profiles(username, avatar_public_id)`)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getAllVideosByUsers(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('user_Id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getProfile(username: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*, videos(*)')
    .eq('username', username)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
