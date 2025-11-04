import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignWithPassword } from "@/hooks/mutations/use-sign-in-with-password";
import { useState } from "react";
import { Link } from "react-router";
import gitHubLogo from "@/assets/github-mark.svg";
import useSignInWithOAuth from "@/hooks/mutations/use-sign-in-with-oauth";
import type { Provider } from "@supabase/supabase-js";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInWithPassword } = useSignWithPassword();
  const { mutate: signInWithOAuth } = useSignInWithOAuth();

  function handleSignInWithPassword() {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({
      email,
      password,
    });
  }

  function handleSignInWithGitHubClick() {
    signInWithOAuth("github");
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">로그인</div>
      <div className="flex flex-col gap-2">
        <Input
          className="py-6"
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="py-6"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button className="w-full" onClick={handleSignInWithPassword}>
          로그인
        </Button>
        <Button
          className="w-full"
          variant={"outline"}
          onClick={handleSignInWithGitHubClick}
        >
          <img src={gitHubLogo} className="h-4 w-4" />
          GitHub 계정으로 로그인
        </Button>
      </div>
      <div>
        <Link className="text-muted-foreground hover:underline" to={"/sign-up"}>
          계정이 없으시다면? 회원가입
        </Link>
      </div>
    </div>
  );
}
