import supabase from "@/lib/supabase";
import type { Provider } from "@supabase/supabase-js";

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

  // 🚨 [핵심 로직 추가]: 회원가입 요청 성공 직후 기존/불완전 세션 강제 종료
  // 이렇게 하면 브라우저 Local Storage에서 남아있던 세션 토큰이 삭제된다.
  const { error: signOutError } = await supabase.auth.signOut();
  if (signOutError)
    console.error("SignOut during cleanup failed:", signOutError.message);

  if (error) throw error;
  return data;
}

export async function signInWithPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { error: signOutError } = await supabase.auth.signOut();
  if (signOutError)
    console.error("SignOut during cleanup failed:", signOutError.message);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error; //여기서 에러를 던지면 useMutaion에서 에러를 감지한다.
  return data;
}

export async function signInWithOAuth(provider: Provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
  });

  if (error) throw error;
  return data;
}

export async function requestPasswordResetEmail({ email }: { email: string }) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${import.meta.env.VITE_PUBLIC_URL}/reset-password`,
  });

  if (error) throw error;

  return data;
}

export async function updateNewPassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({ password });

  if (error) throw error;
  return data;
}
