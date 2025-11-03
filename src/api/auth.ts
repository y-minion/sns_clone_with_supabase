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

  // 🚨 [핵심 로직 추가]: 회원가입 요청 성공 직후 기존/불완전 세션 강제 종료
  // 이렇게 하면 브라우저 Local Storage에서 남아있던 세션 토큰이 삭제된다.
  const { error: signOutError } = await supabase.auth.signOut();
  if (signOutError)
    console.error("SignOut during cleanup failed:", signOutError.message);

  if (error) throw error;
  return data;
}
