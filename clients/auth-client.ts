import { ActivateAccountInputs } from "@/components/activate-account/activate-account-page";
import { apiEndpoint } from "@/config/api-endpoint";
import { SignupInputs } from "@/domains/singup/singup-inputs";

export async function register(signupPayload: SignupInputs) {
  const res = await fetch(apiEndpoint.auth.register, {
    method: "POST",
    body: JSON.stringify(signupPayload),
    headers: { "Content-Type": "application/json" },
  });
  const user = await res.json();
  if (res.ok) {
    return { ...user };
  } else {
    throw new Error(`Error: ${res.statusText}`);
  }
}

export async function activateAccount({ token }: ActivateAccountInputs) {
  if (!token) {
    throw new Error("Activation token is required");
  }

  const url = `${apiEndpoint.auth.activateAccount}?token=${encodeURIComponent(token)}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to activate account");
  }

  return await res.text();
}
