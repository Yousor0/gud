import { createClient } from '../../../lib/supabase/server';

export async function searchVideos(query, limit = 24) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('videos')
    .select('*, profiles(username, avatar_s3_key, first_name, last_name)')
    .ilike('title', `%${query}%`)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data;
}

export async function searchProfessionals(query, limit = 24) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('full_professional_profiles')
    .select(
      'user_id, username, first_name, last_name, avatar_s3_key, specialties, certifications, content_type'
    )
    .or(
      `first_name.ilike.%${query}%,last_name.ilike.%${query}%,username.ilike.%${query}%`
    )
    .limit(limit);

  if (error) throw new Error(error.message);
  return data;
}
