import { updateNewPassword } from "@/api/auth";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateNewPassword(callbacks: UseMutationCallback) {
  return useMutation({
    mutationFn: updateNewPassword,
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
  });
}
