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
