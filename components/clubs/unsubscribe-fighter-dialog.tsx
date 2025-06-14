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
import { useUnsubscribeFighterFromClubMutation } from "@/hooks/fighter_profile/use-unsubscribe-fighter-mutation";

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
  } = useUnsubscribeFighterFromClubMutation(fighterId, clubId);

  const handleUnsubscribeFighter = async () => {
    if (fighter) {
      unsubscribeFighterMutate({
        unsubscribeFighterId: fighterId,
        fromClubId: clubId,
      });
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
          <DialogTitle>
            Unsubscibe {fighter?.name} from {club?.name}
          </DialogTitle>
          <DialogDescription>
            <p>
              Are you sure you want to unsubscribe this fighter from your club?
            </p>

            <span className="font-bold">{fighter?.name || "Unknown"}</span>
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
