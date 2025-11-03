import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/hooks/mutations/use-sign-up";
import { useState } from "react";
import { Link } from "react-router";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signUp, isPending } = useSignUp();

  const handleSignUpClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    //유효성 검사가 통과 되면 supabase에 회원가입 요청을 보내야한다.
    signUp({ email, password });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">회원가입</div>
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
      <div>
        <Button
          className="w-full"
          onClick={handleSignUpClick}
          disabled={isPending}
        >
          {isPending ? "회원 가입 처리 중입니다." : "회원가입"}
        </Button>
      </div>
      <div>
        <Link className="text-muted-foreground hover:underline" to={"/sign-in"}>
          이미 계정이 있다면? 로그인
        </Link>
      </div>
    </div>
  );
}
