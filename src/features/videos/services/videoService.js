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

export async function searchVideos(query) {
  const supabase = await createClient();

  // Find user IDs whose username matches the query (for professional account search)
  const { data: matchingProfiles } = await supabase
    .from('profiles')
    .select('user_id')
    .ilike('username', `%${query}%`);

  const matchingUserIds = (matchingProfiles || []).map((p) => p.user_id);

  // Build the filter: title, tags array, or uploader username
  let queryBuilder = supabase
    .from('videos')
    .select(
      `id, title, description, tags, thumbnail_public_id, created_at, profiles!user_id(username, first_name, last_name, avatar_public_id, role)`
    )
    .order('created_at', { ascending: false });

  if (matchingUserIds.length > 0) {
    queryBuilder = queryBuilder.or(
      `title.ilike.%${query}%,tags.cs.{"${query}"},user_id.in.(${matchingUserIds.join(',')})`
    );
  } else {
    queryBuilder = queryBuilder.or(
      `title.ilike.%${query}%,tags.cs.{"${query}"}`
    );
  }

  const { data, error } = await queryBuilder;
  if (error) throw new Error(error.message);

  // Surface professional accounts first
  return [
    ...data.filter((v) => v.profiles?.role === 'professional'),
    ...data.filter((v) => v.profiles?.role !== 'professional'),
  ];
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
