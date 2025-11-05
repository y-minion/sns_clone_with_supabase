import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgetPasswordPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className="text-2xl font-bold">비밀번호를 잊으셨나요?</div>
        <div className="text-muted-foreground">
          이메일로 비밀번호를 재설정 할 수 있는 인증링크를 보내드립니다.
        </div>
      </div>

      <Input className="py-6" type="email" placeholder="이메일을 입력하세요" />
      <Button className="w-full" onClick={() => {}}>
        인증 메일 요청하기
      </Button>
    </div>
  );
}
