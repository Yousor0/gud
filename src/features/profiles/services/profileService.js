import { createClient } from '../../../lib/supabase/client';

export async function fetchProfileByUsername(username) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !data) throw new Error('Profile not found');
  return data;
}

export async function fetchUserVideos(userId) {
  const supabase = createClient();
  const { data } = await supabase
    .from('videos')
    .select('*')
    .eq('user_Id', userId);

  return data || [];
}

export async function updateProfile(userId, data) {
  const supabase = createClient();
  const { error } = await supabase
    .from('profiles')
    .update(data)
    .eq('id', userId);

  if (error) throw error;
}

export async function updateProfessional(userId, data) {
  const { error } = await supabase
    .from('professionals')
    .update(data)
    .eq('uuid', userId);

  if (error) throw error;
}
