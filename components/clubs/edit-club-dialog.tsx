import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ClubRequest, ClubResponse, EditClubInputs } from "@/domains/club";
import { Dumbbell, Info, Mail, MapPin, Phone } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useEditClubMutation } from "@/hooks/club/use-edit-club-mutation";

export type EditClubDialogProps = {
  club: ClubResponse;
  editClubDialogIsOpen: boolean;
  onCancel: () => void;
};

export function EditClubDialog({
  club,
  editClubDialogIsOpen,
  onCancel,
}: EditClubDialogProps) {
  const handleOncancel = () => {
    onCancel();
    reset();
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditClubInputs>({
    defaultValues: {
      name: club.name,
      description: club.description,
      address: club.address,
      email: club.email,
      phone: club.phone,
    },
  });

  const clubId = club.id || -1;

  const { mutate: EditClubMutate } = useEditClubMutation(clubId);

  const onSubmit: SubmitHandler<EditClubInputs> = async (data) => {
    const editClubRequest: ClubRequest = {
      ...data,
    };
    EditClubMutate({ clubId, editClubRequest });
    handleOncancel();
  };

  return (
    <Dialog open={editClubDialogIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit club {club.name}</DialogTitle>
          <DialogDescription>
            Fill in the information to update the club
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
          id="edit-event-form"
        >
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4" />
              Club Name
            </Label>
            <Input
              id="name"
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
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <span className="text-destructive">{errors.address.message}</span>
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
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^(?:\+34\s?)?[679]\d{2}\s?\d{3}\s?\d{3}$/,
                  message: "Enter a valid Spanish phone number",
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
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleOncancel}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={handleOncancel}>
            Cancel
          </Button>
          <Button type="submit" form="edit-event-form">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
