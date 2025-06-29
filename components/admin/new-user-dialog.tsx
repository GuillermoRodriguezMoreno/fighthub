import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NewUserInputs, NewUserRequest } from "@/domains/user";
import { UseGetRolesQuery } from "@/hooks/role/use-get-roles-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { RoleType } from "@/domains/roles";
import { fromRoleTypeToRole } from "@/lib/user-utils";
import { useNewUserMutation } from "@/hooks/user/use-new-user-mutation";

export type NewUserDialogProps = {
  newUserDialogIsOpen: boolean;
  onSave: () => void;
  onCancel: () => void;
};

export function NewUserDialog({
  newUserDialogIsOpen,
  onSave,
  onCancel,
}: NewUserDialogProps) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<NewUserInputs>({
    defaultValues: {
      username: "",
      email: "",
      newPassword: "",
      repeatPassword: "",
      roles: [RoleType.USER],
      isAccountEnabled: "false",
      isAccountLocked: "false",
    },
  });

  const { mutate: newUserMutate } = useNewUserMutation();

  const onSubmit: SubmitHandler<NewUserInputs> = async (data) => {
    const newUserRequest: NewUserRequest = {
      ...data,
      password: data.newPassword,
      roles: data.roles.map((role) => fromRoleTypeToRole(role)),
    };
    newUserMutate(newUserRequest);
    reset();
    onSave();
  };

  const handleOncancel = () => {
    reset();
    onCancel();
  };

  const roles = UseGetRolesQuery().data?.content || [];

  return (
    <Dialog open={newUserDialogIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New user</DialogTitle>
          <DialogDescription>
            Create new user here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="name"
                placeholder="coolNickname"
                className="col-span-3"
                {...register("username", { required: true })}
              />
              {errors.username?.type === "required" && (
                <span className="text-destructive col-span-4">
                  This field is required
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                placeholder="example@mail.com"
                className="col-span-3"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email?.type === "required" && (
                <span className="text-destructive col-span-4">
                  This field is required
                </span>
              )}
              {errors.email?.type === "pattern" && (
                <span className="text-destructive col-span-4">
                  Invalid email
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newPassword">New password</Label>
              <Input
                id="newPassword"
                type="password"
                className="col-span-3"
                {...register("newPassword", { required: true, minLength: 8 })}
              />
              {errors.newPassword?.type === "required" && (
                <span className="text-destructive col-span-4">
                  This field is required
                </span>
              )}
              {errors.newPassword?.type === "minLength" && (
                <span className="text-destructive col-span-4">
                  Password must be at least 8 characters
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="repeatPassword">Repeat password</Label>
              <Input
                id="repeatPassword"
                type="password"
                className="col-span-3"
                {...register("repeatPassword", {
                  required: true,
                  minLength: 8,
                  validate: (value) =>
                    value === watch("newPassword") ||
                    "The passwords do not match",
                })}
              />
              {errors.repeatPassword && (
                <span className="text-destructive col-span-4">
                  The passwords do not match
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <div className="col-span-3">
                <Controller
                  name="roles"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value[0] || RoleType.USER}
                      onValueChange={(value) => field.onChange([value])}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={RoleType.USER} />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.name}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.roles && (
                  <span className="text-destructive col-span-4">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountEnabled">Account enabled</Label>
              <div className="col-span-3">
                <Controller
                  name="isAccountEnabled"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountLocked">Account locked</Label>
              <div className="col-span-3">
                <Controller
                  name="isAccountLocked"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleOncancel}>
              Cancel
            </Button>
            <Button type="submit">Create new user</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
