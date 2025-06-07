"use client";
import react, { JSX } from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useActivateAccountMutation } from "@/hooks/auth/use-activate-account-mutation";
import { AlertError } from "../core/alert-error";
import { AlertInfo } from "../core/alert-info";

export type ActivateAccountInputs = {
  token: string;
};

export function ActivateAccountPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivateAccountInputs>();
  const { mutateAsync: activateAccount, isError } =
    useActivateAccountMutation();
  const onSubmit: SubmitHandler<ActivateAccountInputs> = async (token) => {
    await activateAccount(token);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="p-6 md:p-8"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome to FightHub</h1>
                <p className="text-muted-foreground text-balance">
                  Activate your account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Token</Label>
                <Input
                  id="token"
                  type="text"
                  placeholder="Enter your token here..."
                  {...register("token", {
                    required: true,
                    // pattern: /^\S+@\S+$/i,
                  })}
                />
                {errors.token?.type === "required" && (
                  <span className="text-destructive">
                    This field is required
                  </span>
                )}
                {errors.token?.type === "pattern" && (
                  <span className="text-destructive">Invalid token</span>
                )}
              </div>
              <Button type="submit">Activate</Button>
              {isError && (
                <AlertInfo
                  title={"An error has ocurred"}
                  variant="destructive"
                />
              )}
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
    </div>
  );
}
