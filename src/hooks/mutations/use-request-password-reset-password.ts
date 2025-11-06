import { requestPasswordResetEmail } from "@/api/auth";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useRequestPasswordResetPassword(
  callbacks: UseMutationCallback,
) {
  return useMutation({
    mutationFn: requestPasswordResetEmail,
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
  });
}
