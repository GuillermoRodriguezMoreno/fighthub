import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { EditEventInputs, EventRequest, EventResponse } from "@/domains/event";
import { MapPin, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEditEventMutation } from "@/hooks/event/use-edit-event-mutation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { EventDateTimePicker } from "./event-date-time-picker";
import { useSession } from "next-auth/react";
import { UseGetMyClubsQuery } from "@/hooks/club/use-get-my-clubs-query";
import LoadingSpinner from "../core/loading-spinner";
import { AlertError } from "../core/alert-error";

export type EditEventDialogProps = {
  event: EventResponse;
  editEventDialogIsOpen: boolean;
  onCancel: () => void;
  fromClub?: boolean;
};

export function EditEventDialog({
  event,
  editEventDialogIsOpen,
  onCancel,
  fromClub = false,
}: EditEventDialogProps) {
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
  } = useForm<EditEventInputs>({
    defaultValues: {
      name: event.name,
      description: event.description,
      address: event.address,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
      organizer: event.organizerName,
    },
  });

  const eventId = event.id;
  const session = useSession();
  const ownerEmail = session.data?.user?.email || "";

  const { mutate: EditEventMutate } = useEditEventMutation(
    eventId,
    fromClub,
    ownerEmail,
  );

  const onSubmit: SubmitHandler<EditEventInputs> = async (data) => {
    const organizerId = fromClub
      ? event.organizerId
      : data.organizer === null
        ? parseInt(data.organizer)
        : event.organizerId;
    const editEventRequest: EventRequest = {
      ...data,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
      organizer: {
        id: organizerId,
      },
    };
    EditEventMutate({ eventId, editEventRequest });
    handleOncancel();
  };

  const myClubsQuery = UseGetMyClubsQuery(ownerEmail, !!ownerEmail);

  const isLoading = myClubsQuery.isLoading;

  if (isLoading) {
    return (
      <Dialog open={editEventDialogIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Loading Clubs</DialogTitle>
            <DialogDescription>
              Please wait while we load your clubs...
            </DialogDescription>
          </DialogHeader>
          <LoadingSpinner />
        </DialogContent>
      </Dialog>
    );
  }

  if (myClubsQuery.isError) {
    return (
      <Dialog open={editEventDialogIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <AlertError description="An error has ocurred" />
          <DialogFooter>
            <Button variant="outline" onClick={handleOncancel}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  if (!myClubsQuery.data || myClubsQuery.data.length === 0) {
    return (
      <Dialog open={editEventDialogIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              No clubs found, you need to own a club to edit this event
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleOncancel}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  const clubs = myClubsQuery.data;

  return (
    <Dialog open={editEventDialogIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit event {event.name}</DialogTitle>
          <DialogDescription>
            Fill in the information to update the event
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
          id="edit-event-form"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Event Name</Label>
            <Input
              id="name"
              placeholder="E.g.: National MMA Championship 2024"
              {...register("name", { required: "Event name is required" })}
            />
            {errors.name && (
              <span className="text-destructive">{errors.name.message}</span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the event details, categories, rules, etc."
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
          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Address
            </Label>
            <Input
              id="address"
              placeholder="E.g.: Municipal Sports Pavilion, Main Street 123, Madrid"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <span className="text-destructive">{errors.address.message}</span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <EventDateTimePicker control={control} fieldName={"startDate"} />
              {errors.startDate && (
                <span className="text-destructive">
                  {errors.startDate.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>End Date</Label>
              <EventDateTimePicker control={control} fieldName={"endDate"} />
              {errors.startDate && (
                <span className="text-destructive">
                  {errors.startDate.message}
                </span>
              )}
            </div>
          </div>
          {fromClub ? null : (
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Organizer Club
              </Label>
              <Controller
                name="organizer"
                control={control}
                rules={{ required: "Organizer club is required" }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {clubs.map((club) => (
                        <SelectItem
                          key={club.id}
                          value={String(club.id) || "-1"}
                        >
                          {club.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.organizer && (
                <span className="text-destructive col-span-4">
                  This field is required
                </span>
              )}
            </div>
          )}
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
