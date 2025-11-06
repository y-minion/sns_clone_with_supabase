import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUpdateNewPassword from "@/hooks/mutations/use-reset-password";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUpdatePasswordClick = () => {
    if (password.trim() === "") return;
    updateNewPassword(password);
  };

  const { mutate: updateNewPassword, isPending: isUpdateNewPasswordPending } =
    useUpdateNewPassword({
      onError(error) {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: "top-center",
        });
        setPassword("");
      },
      onSuccess() {
        toast.success("비밀번호가 성공적으로 변경되었습니다.", {
          position: "top-center",
        });
        navigate("/");
      },
    });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className="text-2xl font-bold">비밀번호 재설정하기</div>
        <div className="text-muted-foreground">
          새로운 비밀번호를 입력하세요.
        </div>
      </div>

      <Input
        disabled={isUpdateNewPasswordPending}
        onChange={(e) => setPassword(e.target.value)}
        className="py-6"
        type="password"
        placeholder="password"
      />
      <Button
        disabled={isUpdateNewPasswordPending}
        className="w-full"
        onClick={handleUpdatePasswordClick}
      >
        비밀번호 변경하기
      </Button>
    </div>
  );
}
