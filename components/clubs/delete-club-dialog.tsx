import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ClubResponse } from "@/domains/club";
import { useDeleteClubMutation } from "@/hooks/club/use-delete-club-mutation";

export type DeleteClubDialogProps = {
  deleteClubDialogIsOpen: boolean;
  onCancel: () => void;
  club?: ClubResponse;
  ownerEmail?: string;
};

export function DeleteClubDialog({
  deleteClubDialogIsOpen,
  onCancel,
  club,
  ownerEmail = "",
}: DeleteClubDialogProps) {
  const clubId = club?.id || -1;

  const { mutate: deleteClubMutate } = useDeleteClubMutation(
    clubId,
    ownerEmail,
  );

  const handleDeleteClub = async () => {
    if (club) {
      deleteClubMutate(clubId);
      onCancel();
    }
  };

  const handleOncancel = () => {
    onCancel();
  };

  return (
    <Dialog open={deleteClubDialogIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete {club?.name}</DialogTitle>
          <DialogDescription>
            <p>Are you sure you want to delete this club?</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleOncancel}>
            Cancel
          </Button>
          <Button onClick={handleDeleteClub}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
