import { createClient } from '../../../lib/supabase/server';

export async function getCommentsByVideoId(videoId) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('comments')
    .select(`*, profiles(username, avatar_public_id, first_name, last_name)`)
    .eq('video_id', videoId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}
