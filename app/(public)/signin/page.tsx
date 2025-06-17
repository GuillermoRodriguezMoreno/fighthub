import LoadingSpinner from "@/components/core/loading-spinner";
import { SigninForm } from "@/components/signin/signin-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Suspense fallback={<LoadingSpinner />}>
        <SigninForm />
        </Suspense>
      </div>
    </div>
  );
}
