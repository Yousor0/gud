import { createClient } from '../../../../utils/supabase/client';

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
