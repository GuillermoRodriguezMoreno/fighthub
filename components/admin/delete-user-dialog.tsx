import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { UserResponse } from "@/domains/user";
import { useDeleteUserMutation } from "@/hooks/user/use-delete-user-mutation";

export type DeleteUserDialogProps = {
  user: UserResponse | null;
  deleteUserDialogIsOpen: boolean;
  onDelete: (user: UserResponse) => void;
  onCancel: () => void;
};

export function DeleteUserDialog({
  user,
  deleteUserDialogIsOpen,
  onCancel,
  onDelete,
}: DeleteUserDialogProps) {
  const { mutate: deleteUserMutate } = useDeleteUserMutation(user?.id || -1);

  const handleDeleteUser = async () => {
    if (user) {
      deleteUserMutate(user.id);
      onDelete(user);
    }
  };

  const handleOncancel = () => {
    onCancel();
  };

  return (
    <Dialog open={deleteUserDialogIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete user</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete user{" "}
            <span className="font-bold">{user?.email}</span>.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleOncancel}>
            Cancel
          </Button>
          <Button onClick={handleDeleteUser}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
