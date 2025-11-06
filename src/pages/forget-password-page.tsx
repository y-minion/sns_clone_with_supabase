import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useRequestPasswordResetPassword from "@/hooks/mutations/use-request-password-reset-password";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");

  const {
    mutate: requestPasswordResetEmail,
    isPending: isRequestPasswordResetEmailPending,
  } = useRequestPasswordResetPassword({
    onSuccess() {
      toast.info("인증메일이 잘 발송 되었습니다.", {
        position: "top-center",
      });
      setEmail("");
    },
    onError(error) {
      const message = generateErrorMessage(error);
      toast.error(message, {
        position: "top-center",
      });
      setEmail("");
    },
  });

  function handleSendEmailCLick() {
    if (email.trim() === "") return;
    requestPasswordResetEmail({ email });
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className="text-2xl font-bold">비밀번호를 잊으셨나요?</div>
        <div className="text-muted-foreground">
          이메일로 비밀번호를 재설정 할 수 있는 인증링크를 보내드립니다.
        </div>
      </div>

      <Input
        disabled={isRequestPasswordResetEmailPending}
        onChange={(e) => setEmail(e.target.value)}
        className="py-6"
        type="email"
        placeholder="이메일을 입력하세요"
      />
      <Button
        disabled={isRequestPasswordResetEmailPending}
        className="w-full"
        onClick={handleSendEmailCLick}
      >
        인증 메일 요청하기
      </Button>
    </div>
  );
}
