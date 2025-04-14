import { register } from "@/clients/auth-client";
import { SignupInputs } from "@/domains/singup/singup-inputs";
import { useMutation } from "@tanstack/react-query";

export function useRegisterMutation() {
    return useMutation({
        mutationKey: ["register"],
        mutationFn: async (signupPayload: SignupInputs) => {
            return register(signupPayload);
        },
    });
}