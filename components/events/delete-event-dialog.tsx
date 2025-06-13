import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { EventResponse } from "@/domains/event";
import { useDeleteEventMutation } from "@/hooks/event/use-delete-event-mutation";

export type DeleteEventDialogProps = {
  deleteEventDialogIsOpen: boolean;
  onCancel: () => void;
  event?: EventResponse;
  organizerEmail: string;
};

export function DeleteEventDialog({
  deleteEventDialogIsOpen,
  onCancel,
  event,
  organizerEmail,
}: DeleteEventDialogProps) {
  const eventId = event?.id || -1;

  const { mutate: deleteEventMutate } = useDeleteEventMutation(
    eventId,
    organizerEmail,
  );

  const handleDeleteEvent = async () => {
    if (event) {
      deleteEventMutate(eventId);
      onCancel();
    }
  };

  const handleOncancel = () => {
    onCancel();
  };

  return (
    <Dialog open={deleteEventDialogIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete {event?.name}</DialogTitle>
          <DialogDescription>
            <p>Are you sure you want to delete this event?</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleOncancel}>
            Cancel
          </Button>
          <Button onClick={handleDeleteEvent}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
