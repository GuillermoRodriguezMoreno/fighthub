import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import LoadingSpinner from "../core/loading-spinner";
import { AlertError } from "../core/alert-error";
import { CreateFightInputs, FightRequest } from "@/domains/fight";
import { UseGetCategoriesQuery } from "@/hooks/category/use-get-categories-query";
import { UseGetStylesQuery } from "@/hooks/style/use-get-styles-query";
import { EventResponse } from "@/domains/event";
import { useCreateFightMutation } from "@/hooks/fight/use-new-fight-mutation";
import {
  BookmarkX,
  Flame,
  Gauge,
  Gem,
  ListOrdered,
  Skull,
  Timer,
  Trophy,
  Weight,
} from "lucide-react";

export type CreateFightDialogProps = {
  event: EventResponse;
  createFightDialogIsOpen: boolean;
  onCancel?: () => void;
};

export function CreateFightDialog({
  createFightDialogIsOpen,
  event,
  onCancel,
}: CreateFightDialogProps) {
  const handleOncancel = () => {
    onCancel?.();
    reset();
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateFightInputs>();

  const { mutate: CreateFightMutate } = useCreateFightMutation();

  const onSubmit: SubmitHandler<CreateFightInputs> = async (data) => {
    const createFightRequest: FightRequest = {
      ...data,
      winner: data.winner ? { id: data.winner } : undefined,
      redCornerFighter: data.redCornerFighterId
        ? { id: data.redCornerFighterId }
        : undefined,
      blueCornerFighter: data.blueCornerFighterId
        ? { id: data.blueCornerFighterId }
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
    CreateFightMutate(createFightRequest);
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
      <Dialog open={createFightDialogIsOpen}>
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

  if (isError) {
    return (
      <Dialog open={createFightDialogIsOpen}>
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

  const categories = categoriesQuery.data.content;
  const styles = stylesQuery.data.content;

  return (
    <Dialog open={createFightDialogIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a fight for {event.name}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
          id="edit-event-form"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fightOrder">
                <ListOrdered size={16} /> Fight order
              </Label>
              <Input
                id="fightOrder"
                type="number"
                {...register("fightOrder", {
                  required: "Fight order is required",
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
                name="isTitleFight"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.isTitleFight && (
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
                name="isClosed"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.isClosed && (
                <span className="text-destructive col-span-4">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rounds">
                <Gauge size={16} /> Rounds
              </Label>
              <Input
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
              <Label htmlFor="blueCornerFighterId">
                <Skull size={16} className="text-blue-600" /> Blue Corner
                Fighter
              </Label>
              <Input
                id="blueCornerFighterId"
                {...register("blueCornerFighterId")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="redCornerFighterId">
                <Skull size={16} className="text-red-500" /> Red Corner Fighter
              </Label>
              <Input
                id="redCornerFighterId"
                {...register("redCornerFighterId")}
              />
            </div>
          </div>
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
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={String(category.id)}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.categoryId && (
                  <span className="text-destructive col-span-4">
                    This field is required
                  </span>
                )}
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
                  rules={{ required: "Style is required" }}
                  render={({ field }) => (
                    <Select onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {styles.map((style) => (
                          <SelectItem key={style.id} value={String(style.id)}>
                            {style.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.styleId && (
                  <span className="text-destructive col-span-4">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={handleOncancel}>
            Cancel
          </Button>
          <Button type="submit" form="edit-event-form">
            Create fight
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
