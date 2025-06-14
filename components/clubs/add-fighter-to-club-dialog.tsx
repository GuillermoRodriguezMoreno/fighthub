"use client";
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
import {
  AddFighterToClubInputs,
  AddFighterToClubRequest,
  FighterProfileResponse,
} from "@/domains/fighter-profile";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAddFighterToClubMutation } from "@/hooks/club/use-add-fighter-to-club-mutation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { SearchFighterByNameAutocomplete } from "../fighter-profiles/search-by-name-autocomplete";
import { get } from "http";

export type AddFighterToClubDialogProps = {
  addFighterToClubDialogIsOpen: boolean;
  onCancel: () => void;
  club?: ClubResponse;
};

export function AddFighterToClubDialog({
  addFighterToClubDialogIsOpen,
  onCancel,
  club,
}: AddFighterToClubDialogProps) {
  const clubId = club?.id || -1;
  const [selectedFighter, setSelectedFighter] =
    useState<FighterProfileResponse | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddFighterToClubInputs>();

  const { mutate: addFighterToClubMutate, isPending } =
    useAddFighterToClubMutation(clubId);

  const handleSelect = (fighter: FighterProfileResponse) => {
    setSelectedFighter(fighter);
  };

  const handleCancel = () => {
    reset();
    setSelectedFighter(null);
    onCancel();
  };

  const onSubmit: SubmitHandler<AddFighterToClubInputs> = () => {
    if (!selectedFighter) {
      return;
    }
    addFighterToClubMutate(selectedFighter.id);
    handleCancel();
  };

  return (
    <Dialog open={addFighterToClubDialogIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add fighter to {club?.name}</DialogTitle>
          <DialogDescription>
            Search for a fighter to add him/her to the club
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
          id="add-fighter-to-club-form"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Fighter Name</Label>
            <SearchFighterByNameAutocomplete onSelect={handleSelect} />
            <input type="hidden" {...register("fighterId")} />
            {errors.fighterId && (
              <span className="text-destructive">
                {errors.fighterId.message}
              </span>
            )}
          </div>
        </form>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="add-fighter-to-club-form"
            disabled={isPending || !selectedFighter}
          >
            {isPending ? "Adding..." : "Add Fighter"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
