import { signInWithPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export function useSignWithPassword() {
  return useMutation({
    mutationFn: signInWithPassword,
  });
}
