import { createClient } from '../../../lib/supabase/server';

export async function getProfessionalProfile(userId) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('full_professional_profiles')
    .select('content_type, specialties, certifications')
    .eq('user_id', userId)
    .single();
  return data ?? null;
}
