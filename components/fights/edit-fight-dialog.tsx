import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/core/loading-spinner";
import { AlertError } from "@/components/core/alert-error";
import { EditFightInputs, FightRequest, FightResponse } from "@/domains/fight";
import { UseGetCategoriesQuery } from "@/hooks/category/use-get-categories-query";
import { UseGetStylesQuery } from "@/hooks/style/use-get-styles-query";
import { EventResponse } from "@/domains/event";
import {
  BookmarkX,
  Equal,
  Flame,
  Gauge,
  Gem,
  ListOrdered,
  Medal,
  Skull,
  Swords,
  Timer,
  Trophy,
  Weight,
} from "lucide-react";
import { useEditFightMutation } from "@/hooks/fight/use-edit-fight-mutation";
import { useEffect, useState } from "react";
import { SearchFighterByNameAutocomplete } from "../fighter-profiles/search-by-name-autocomplete";

export type EditFightDialogProps = {
  event: EventResponse;
  editFightDialogIsOpen: boolean;
  fight: FightResponse | null;
  onCancel?: () => void;
};

export function EditFightDialog({
  editFightDialogIsOpen,
  event,
  fight,
  onCancel,
}: EditFightDialogProps) {
  const [formData, setFormData] = useState<FightResponse | null>(null);
  const [selectedBlueFighter, setSelectedBlueFighter] = useState<number | null>(
    fight?.blueCornerFighterId || null,
  );
  const [selectedRedFighter, setSelectedRedFighter] = useState<number | null>(
    fight?.redCornerFighterId || null,
  );

  const handleOncancel = () => {
    onCancel?.();
    reset();
    setSelectedBlueFighter(null);
    setSelectedRedFighter(null);
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditFightInputs>({
    defaultValues: {
      fightOrder: formData?.fightOrder,
      weight: formData?.weight,
      rounds: formData?.rounds,
      minutesPerRound: formData?.minutesPerRound,
      titleFight: formData?.titleFight ? "true" : "false",
      closed: formData?.closed ? "true" : "false",
      ko: formData?.ko ? "true" : "false",
      draw: formData?.draw ? "true" : "false",
      categoryId: String(formData?.categoryId || ""),
      styleId: String(formData?.styleId || ""),
    },
  });

  useEffect(() => {
    if (formData) {
      reset({
        fightOrder: formData.fightOrder,
        weight: formData.weight,
        rounds: formData.rounds,
        minutesPerRound: formData.minutesPerRound,
        titleFight: formData.titleFight ? "true" : "false",
        closed: formData.closed ? "true" : "false",
        ko: formData.ko ? "true" : "false",
        draw: formData.draw ? "true" : "false",
        categoryId: String(formData.categoryId || ""),
        styleId: String(formData.styleId || ""),
      });
    }
  }, [formData, reset]);

  useEffect(() => {
    setFormData(fight);
    setSelectedBlueFighter(fight?.blueCornerFighterId || null);
    setSelectedRedFighter(fight?.redCornerFighterId || null);
  }, [editFightDialogIsOpen, fight]);

  const handleSelectBlueFighter = (fighterId: number) => {
    setSelectedBlueFighter(fighterId);
  };

  const handleSelectRedFighter = (fighterId: number) => {
    setSelectedRedFighter(fighterId);
  };

  const fightId = formData?.id || -1;
  const eventId = event?.id || -1;
  const { mutate: EditFightMutate } = useEditFightMutation(eventId, fightId);

  const onSubmit: SubmitHandler<EditFightInputs> = async (data) => {
    const editFightRequest: FightRequest = {
      fightOrder: data.fightOrder,
      titleFight: data.titleFight,
      closed: data.closed,
      ko: data.ko,
      draw: data.draw,
      weight: data.weight,
      rounds: data.rounds,
      minutesPerRound: data.minutesPerRound,
      winner: data.winner ? { id: data.winner } : undefined,
      redCornerFighter: selectedRedFighter
        ? { id: String(selectedRedFighter) }
        : undefined,
      blueCornerFighter: selectedBlueFighter
        ? { id: String(selectedBlueFighter) }
        : undefined,
      event: {
        id: String(event.id),
      },
      category: {
        id: data.categoryId,
      },
      style: {
        id: data.styleId,
      },
    };
    EditFightMutate({ fightId, editFightRequest });
    handleOncancel();
  };

  const categoriesQuery = UseGetCategoriesQuery();
  const stylesQuery = UseGetStylesQuery();

  const isLoading = categoriesQuery.isLoading || stylesQuery.isLoading;
  const isError =
    categoriesQuery.isError ||
    stylesQuery.isError ||
    !categoriesQuery.data ||
    !stylesQuery.data ||
    !categoriesQuery.data.content.length ||
    !stylesQuery.data.content.length;

  if (isLoading) {
    return (
      <Dialog open={editFightDialogIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Loading...</DialogTitle>
            <DialogDescription>Please wait while we load...</DialogDescription>
          </DialogHeader>
          <LoadingSpinner />
        </DialogContent>
      </Dialog>
    );
  }

  if (isError) {
    return (
      <Dialog open={editFightDialogIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Error</DialogTitle>
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

  const categories = categoriesQuery.data.content;
  const styles = stylesQuery.data.content;
  const fighIsClosed =
    formData?.closed &&
    formData.blueCornerFighterId &&
    formData.redCornerFighterId;

  return (
    <Dialog open={editFightDialogIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit fight</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
          id="edit-fight-form"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fightOrder">
                <ListOrdered size={16} /> Fight order
              </Label>
              <Input
                id="fightOrder"
                type="number"
                defaultValue={formData?.fightOrder || ""}
                {...register("fightOrder", {
                  required: "Fight order is required",
                  min: {
                    value: 1,
                    message: "Fight order must be at least 1",
                  },
                })}
              />
              {errors.fightOrder && (
                <span className="text-destructive">
                  {errors.fightOrder.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">
                <Weight size={16} /> Weight
              </Label>
              <Input
                defaultValue={formData?.weight || ""}
                id="weight"
                type="number"
                {...register("weight", { required: "Weight is required" })}
              />
              {errors.weight && (
                <span className="text-destructive">
                  {errors.weight.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Trophy size={16} className="text-primary" /> Is title fight?
              </Label>
              <Controller
                name="titleFight"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    {...register("titleFight")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key={"isTitleFight-true"} value="true">
                        Yes
                      </SelectItem>
                      <SelectItem key={"isTitleFight-false"} value="false">
                        No
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.titleFight && (
                <span className="text-destructive col-span-4">
                  This field is required
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <BookmarkX size={16} /> Is closed?
              </Label>
              <Controller
                name="closed"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    {...register("closed")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key={"isClosed-true"} value="true">
                        Yes
                      </SelectItem>
                      <SelectItem key={"isClosed-false"} value="false">
                        No
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.closed && (
                <span className="text-destructive col-span-4">
                  This field is required
                </span>
              )}
            </div>
          </div>
          {fighIsClosed ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Swords size={16} /> Is KO?
                </Label>
                <Controller
                  name="ko"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      {...register("ko")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key={"isKo-true"} value="true">
                          Yes
                        </SelectItem>
                        <SelectItem key={"isKo-false"} value="false">
                          No
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Equal size={16} /> Is draw?
                </Label>
                <Controller
                  name="draw"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      {...register("draw")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key={"isDraw-true"} value="true">
                          Yes
                        </SelectItem>
                        <SelectItem key={"isDraw-false"} value="false">
                          No
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rounds">
                <Gauge size={16} /> Rounds
              </Label>
              <Input
                defaultValue={formData?.rounds || ""}
                id="rounds"
                type="number"
                {...register("rounds", { required: "Rounds are required" })}
              />
              {errors.rounds && (
                <span className="text-destructive">
                  {errors.rounds.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="minutesPerRound">
                <Timer size={16} /> Minutes per round
              </Label>
              <Input
                defaultValue={formData?.minutesPerRound || ""}
                id="minutesPerRound"
                type="number"
                {...register("minutesPerRound", {
                  required: "Minutes per round are required",
                })}
              />
              {errors.minutesPerRound && (
                <span className="text-destructive">
                  {errors.minutesPerRound.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                <Skull size={16} className="text-blue-600" /> Blue Corner
                Fighter
              </Label>
              <SearchFighterByNameAutocomplete
                onSelect={handleSelectBlueFighter}
                defaultValue={formData?.blueCornerFighterName}
              />
            </div>
            <div className="space-y-2">
              <Label>
                <Skull size={16} className="text-red-500" /> Red Corner Fighter
              </Label>
              <SearchFighterByNameAutocomplete
                onSelect={handleSelectRedFighter}
                defaultValue={formData?.redCornerFighterName}
              />
            </div>
          </div>
          {fighIsClosed ? (
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Medal size={16} className="text-primary" /> Winner
              </Label>
              <Controller
                name="winner"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue={String(formData?.winnerId || "")}
                    value={field.value}
                    onValueChange={field.onChange}
                    {...register("winner")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        key={"blue"}
                        value={String(formData?.blueCornerFighterId)}
                      >
                        {formData?.blueCornerFighterName ?? "unknow"}
                      </SelectItem>
                      <SelectItem
                        key={"red"}
                        value={String(formData?.redCornerFighterId)}
                      >
                        {formData?.redCornerFighterName ?? "unknow"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          ) : null}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="categoryId" className="text-right">
                <Gem size={16} />
                Category
              </Label>
              <div className="col-span-3">
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      defaultValue={String(formData?.categoryId || "")}
                      onValueChange={(value) => field.onChange(value)}
                      {...register("categoryId")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category, index) => (
                          <SelectItem
                            key={category?.id ?? `${index}-category`}
                            value={String(category.id)}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="styleId" className="text-right">
                <Flame size={16} /> Style
              </Label>
              <div className="col-span-3">
                <Controller
                  name="styleId"
                  control={control}
                  defaultValue={String(formData?.styleId || "")}
                  render={({ field }) => (
                    <Select
                      defaultValue={String(formData?.styleId || "")}
                      onValueChange={(value) => field.onChange(value)}
                      {...register("styleId")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {styles.map((style, index) => (
                          <SelectItem
                            key={style?.id ?? `${index}-style`}
                            value={String(style.id)}
                          >
                            {style.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={handleOncancel}>
            Cancel
          </Button>
          <Button type="submit" form="edit-fight-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
