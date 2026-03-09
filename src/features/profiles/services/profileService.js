import { createClient } from '../../../lib/supabase/client';

// Fetch All Users
export async function fetchAllUsers() {
  const supabase = createClient();
  const { data, error } = await supabase.from('profiles').select('*');

  if (error) throw error;
  return data;
}

// Fetch All Profesionals
export async function fetchAllProfessionals() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('full_professional_profiles')
    .select('*');

  if (error) throw error;
  return data;
}

// Fetch User
export async function fetchUserByID(userId) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error || !data) throw new Error(error?.message || 'User not found');
}

// Fetch User by Username
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

// fetch Professional by Id
export async function fetchProfessionalByUserId(userId) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('full_professional_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
}

// Update User Profile
export async function updateProfile(userId, data) {
  const supabase = createClient();
  const { error } = await supabase
    .from('profiles')
    .update(data)
    .eq('user_id', userId);

  if (error) throw error;
}

// Update User + Professional Profile
export async function updateProfessional(userId, data) {
  const supabase = createClient();
  const { error } = await supabase
    .from('professional_profiles')
    .update(data)
    .eq('user_id', userId);

  if (error) throw error;
}

// FetchVideosBy UserId
export async function fetchUserVideos(userId) {
  const supabase = createClient();
  const { data } = await supabase
    .from('videos')
    .select('*')
    .eq('user_id', userId);

  return data || [];
}
