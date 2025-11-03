import { signUp } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export function useSignUp() {
  return useMutation({
    mutationFn: signUp,
    onError: (error) => {
      alert(`에러 발생!: ${error}`);
    },
  });
}
