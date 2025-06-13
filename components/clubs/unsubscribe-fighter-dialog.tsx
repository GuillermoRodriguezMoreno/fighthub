import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { FighterProfileResponse } from "@/domains/fighter-profile";
import { ClubResponse } from "@/domains/club";

export type UnsubscribeFighterDialogProps = {
  fighter: FighterProfileResponse | null;
  unsubscribeFighterDialogIsOpen: boolean;
  onCancel: () => void;
  club?: ClubResponse;
};

export function UnsubscribeFighterDialog({
  fighter,
  unsubscribeFighterDialogIsOpen,
  onCancel,
  club,
}: UnsubscribeFighterDialogProps) {
  const clubId = club?.id || -1;
  const fighterId = fighter?.id || -1;

  const {
    mutate: unsubscribeFighterMutate,
    isSuccess,
    isError,
  } = useUnsubscribeFighterMutation(clubId, fighterId);

  const handleUnsubscribeFighter = async () => {
    if (fighter) {
      unsubscribeFighterMutate(fighterId);
      onCancel();
    }
  };

  const handleOncancel = () => {
    onCancel();
  };

  return (
    <Dialog open={unsubscribeFighterDialogIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete fight</DialogTitle>
          <DialogDescription>
            <p>
              Are you sure you want to unsubscribe this fighter from your club?
            </p>

            <p className="font-bold">{fighter?.name || "Unknown"}</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleOncancel}>
            Cancel
          </Button>
          <Button onClick={handleUnsubscribeFighter}>Unsubscribe</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
