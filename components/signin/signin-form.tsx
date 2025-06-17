"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { SigninInputs } from "@/domains/signin/signin-inputs";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { path } from "@/config/path";
import React from "react";

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninInputs>();
  const onSubmit: SubmitHandler<SigninInputs> = async (data) => {
    console.log("data", data);
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: path.dashboard.base,
    });
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="p-6 md:p-8"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your FightHub account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@example.com"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                {errors.email?.type === "required" && (
                  <span className="text-destructive">
                    This field is required
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="text-destructive">Invalid email</span>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password", { required: true, minLength: 8 })}
                />
                {errors.password?.type === "required" && (
                  <span className="text-destructive">
                    This field is required
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-destructive">
                    Password must be at least 8 characters
                  </span>
                )}
              </div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
              {error && (
                <div className="text-red-500 text-sm">
                  {error === "CredentialsSignin"
                    ? "Invalid email or password. Please try again."
                    : "An unexpected error occurred. Please try again."}
                </div>
              )}
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/login-image.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking Sign in, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>. {"(work in progress)"}
      </div>
    </div>
  );
}
