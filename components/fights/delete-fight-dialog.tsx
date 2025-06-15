import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { FightResponse } from "@/domains/fight";
import { useDeleteFightMutation } from "@/hooks/fight/use-delete-fight-mutation";
import { EventResponse } from "@/domains/event";

export type DeleteFightDialogProps = {
  fight: FightResponse | null;
  deleteFightDialogIsOpen: boolean;
  onCancel: () => void;
  event?: EventResponse;
};

export function DeleteFightDialog({
  fight,
  deleteFightDialogIsOpen,
  onCancel,
  event,
}: DeleteFightDialogProps) {
  const eventId = event?.id || -1;
  const fightId = fight?.id || -1;

  const { mutate: deleteFightMutate } = useDeleteFightMutation(
    eventId,
    fightId,
  );

  const handleDeleteFight = async () => {
    if (fight) {
      deleteFightMutate(fightId);
      onCancel();
    }
  };

  const handleOncancel = () => {
    onCancel();
  };

  return (
    <Dialog open={deleteFightDialogIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete fight</DialogTitle>
          <DialogDescription>
            <p>Are you sure you want to delete this fight</p>

            <p className="font-bold">
              {fight?.blueCornerFighterName || "Unknow"} vs{" "}
              {fight?.redCornerFighterName || "Unknow"}
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleOncancel}>
            Cancel
          </Button>
          <Button onClick={handleDeleteFight}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
