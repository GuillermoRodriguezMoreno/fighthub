"use client";
import { ClubRequest, NewClubInputs } from "@/domains/club";
import React, { use } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dumbbell, Info, Mail, MapPin, Phone, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNewClubMutation } from "@/hooks/club/use-new-club-mutation";
import { useSession } from "next-auth/react";

export function CreateClubForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewClubInputs>();

  const session = useSession();
  const ownerId = session?.data?.userId || -1;

  const { mutate: newClubMutate } = useNewClubMutation();

  const onSubmit: SubmitHandler<NewClubInputs> = async (data) => {
    const newClubRequest: ClubRequest = {
      ...data,
      owner: {
        id: ownerId,
      },
    };
    newClubMutate(newClubRequest);
    reset();
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6" />
            Create Club
          </CardTitle>
          <CardDescription>
            Complete the form to create a new club
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Name
              </Label>
              <Input
                id="name"
                placeholder="E.g.: Next Gen Fight Club"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-destructive">{errors.name.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              <Input
                id="address"
                placeholder="E.g.: Main Street 123, Madrid"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <span className="text-destructive">
                  {errors.address.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="E.g.: example@mail.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-destructive">{errors.email.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="E.g.: +34 600 000 000"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^(?:\+34\s?)?[679]\d{2}\s?\d{3}\s?\d{3}$/,
                    message: "Invalid phone number format",
                  },
                })}
              />
              {errors.phone && (
                <span className="text-destructive">{errors.phone.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Additional details..."
                rows={4}
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <span className="text-destructive">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="flex justify-end">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
