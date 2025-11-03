import supabase from "@/lib/supabase";

export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: import.meta.env.VITE_SIGN_UP_REDIRECT_URL_DEV },
  });

  if (error) throw error;
  return data;
}
