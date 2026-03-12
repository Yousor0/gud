import { createClient } from '../../../lib/supabase/server';

export async function searchVideos(query, limit = 24) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('videos')
    .select(
      `id, title, description, tags, level, views, thumbnail_public_id, created_at, profiles!user_id(username, first_name, last_name, avatar_public_id)`
    )
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
      'user_id, username, first_name, last_name, avatar_public_id, specialties, certifications, content_type'
    )
    .or(
      `first_name.ilike.%${query}%,last_name.ilike.%${query}%,username.ilike.%${query}%`
    )
    .limit(limit);

  if (error) throw new Error(error.message);
  return data;
}
