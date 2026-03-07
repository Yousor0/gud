import { createClient } from '../../../lib/supabase/client';

export async function logIn(email, password) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function deleteAccount() {
  const supabase = createClient();

  const { data: user, error } = await supabase.auth.getUser();
  if (error) throw error;

  const res = await fetch('api/delete-account', {
    method: 'POST',
    body: JSON.stringify({ userId: user.id }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error);
}

export async function getSession() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export async function getUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function signUp(email, password, username, first_name, last_name) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username, first_name, last_name },
    },
  });

  if (error) throw error;
  return data;
}
