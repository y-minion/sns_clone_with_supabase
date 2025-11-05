import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignWithPassword } from "@/hooks/mutations/use-sign-in-with-password";
import { useState } from "react";
import { Link } from "react-router";
import gitHubLogo from "@/assets/github-mark.svg";
import useSignInWithOAuth from "@/hooks/mutations/use-sign-in-with-oauth";
import { toast } from "sonner";
import { generateErrorMessage } from "@/lib/error";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } =
    useSignWithPassword({
      onError: (error: Error) => {
        const message = generateErrorMessage(error);
        setPassword("");
        toast.error(message, {
          style: {
            background: "red",
          },
          position: "top-center",
        });
      },
    });
  const { mutate: signInWithOAuth, isPending: isSignInWithOAuthPending } =
    useSignInWithOAuth({
      onError: (error: Error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          style: {
            background: "red",
          },
          position: "top-center",
        });
      },
    });

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

  const isPending = isSignInWithPasswordPending || isSignInWithOAuthPending;
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
          disabled={isPending}
        />
        <Input
          className="py-6"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          className="w-full"
          onClick={handleSignInWithPassword}
          disabled={isPending}
        >
          로그인
        </Button>
        <Button
          className="w-full"
          variant={"outline"}
          onClick={handleSignInWithGitHubClick}
          disabled={isPending}
        >
          <img src={gitHubLogo} className="h-4 w-4" />
          GitHub 계정으로 로그인
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Link className="text-muted-foreground hover:underline" to={"/sign-up"}>
          계정이 없으시다면? 회원가입
        </Link>
        <Link
          className="text-muted-foreground hover:underline"
          to={"/forget-password"}
        >
          비밀번호를 잊으셨나요?
        </Link>
      </div>
    </div>
  );
}
