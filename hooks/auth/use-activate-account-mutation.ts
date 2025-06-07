import { activateAccount } from "@/clients/auth-client";
import { ActivateAccountInputs } from "@/components/activate-account/activate-account-page";
import { path } from "@/config/path";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useActivateAccountMutation() {
  const router = useRouter();
  return useMutation({
    mutationKey: [`activate-account`],
    mutationFn: async (token: ActivateAccountInputs) => {
      return activateAccount(token);
    },
    onSuccess: () => {
      router.push(path.signin);
    },
  });
}
