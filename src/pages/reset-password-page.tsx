import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className="text-2xl font-bold">비밀번호 재설정하기</div>
        <div className="text-muted-foreground">
          새로운 비밀번호를 입력하세요.
        </div>
      </div>

      <Input className="py-6" type="password" placeholder="password" />
      <Button className="w-full" onClick={() => {}}>
        비밀번호 변경하기
      </Button>
    </div>
  );
}
