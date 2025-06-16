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
import { UseGetCategoriesQuery } from "@/hooks/category/use-get-categories-query";
import { UseGetStylesQuery } from "@/hooks/style/use-get-styles-query";
import {
  BookmarkX,
  CalendarIcon,
  Equal,
  Flame,
  Gauge,
  Gem,
  Info,
  ListOrdered,
  Medal,
  Ruler,
  Skull,
  Swords,
  Timer,
  Trophy,
  Weight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SearchFighterByNameAutocomplete } from "./search-by-name-autocomplete";
import {
  EditFighterProfileInputs,
  EditFighterProfileRequest,
  FighterProfileResponse,
} from "@/domains/fighter-profile";
import { EventDateTimePicker } from "../events/event-date-time-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { StyleResponse } from "@/domains/style";
import MultiSelectStyle from "./multi-select-styles-input";
import { format } from "date-fns/format";
import { useEditFighterProfileMutation } from "@/hooks/fighter_profile/use-edit-fighter-profile-mutation";
import { Textarea } from "../ui/textarea";

export type EditFighterProfileDialogProps = {
  editFighterProfileDialogIsOpen: boolean;
  fighterProfile: FighterProfileResponse;
  onCancel?: () => void;
};

export function EditFighterProfileDialog({
  editFighterProfileDialogIsOpen,
  fighterProfile,
  onCancel,
}: EditFighterProfileDialogProps) {
  const [formData, setFormData] = useState<FighterProfileResponse | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<StyleResponse[]>(
    fighterProfile.styles || [],
  );
  const fighterDateOfBirth = fighterProfile.dateOfBirth
    ? new Date(fighterProfile.dateOfBirth)
    : new Date();
  const [date, setDate] = useState(fighterDateOfBirth);

  const handeleSelectStyles = (styles: StyleResponse[]) => {
    setSelectedStyles(styles);
  };

  const handleOncancel = () => {
    onCancel?.();
    reset();
    setSelectedStyles([]);
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditFighterProfileInputs>({
    defaultValues: {
      firstname: formData?.firstname || "",
      lastname: formData?.lastname || "",
      dateOfBirth: formData?.dateOfBirth || "",
      weight: formData?.weight || 0,
      height: formData?.height || 0,
      gender: formData?.gender || "",
      biography: formData?.biography || "",
      styleIds: formData?.styles.map((style) => style.id) || [],
      categoryId: formData?.category?.id || 0,
    },
  });

  useEffect(() => {
    if (formData) {
      reset({
        firstname: formData?.firstname || "",
        lastname: formData?.lastname || "",
        dateOfBirth: formData?.dateOfBirth || "",
        weight: formData?.weight || 0,
        height: formData?.height || 0,
        gender: formData?.gender || "",
        biography: formData?.biography || "",
        styleIds: formData?.styles.map((style) => style.id) || [],
        categoryId: formData?.category?.id || 0,
      });
    }
  }, [formData, reset]);

  useEffect(() => {
    setFormData(fighterProfile);
    setSelectedStyles(fighterProfile.styles || []);
  }, [editFighterProfileDialogIsOpen, fighterProfile]);

  const { mutate: EditFighterProfileMutate } = useEditFighterProfileMutation(
    fighterProfile.id,
  );

  const fighterProfileId = fighterProfile.id;

  const onSubmit: SubmitHandler<EditFighterProfileInputs> = async (data) => {
    const editFighterProfileRequest: EditFighterProfileRequest = {
      firstname: data.firstname,
      lastname: data.lastname,
      dateOfBirth: date.toISOString() || fighterProfile.dateOfBirth,
      weight: data.weight,
      height: data.height,
      gender: data.gender,
      biography: data.biography,
      wins: fighterProfile.wins,
      losses: fighterProfile.losses,
      draws: fighterProfile.draws,
      kos: fighterProfile.kos,
      winsInARow: fighterProfile.winsInARow,
      location: fighterProfile.location,
      styles: selectedStyles,
      category: {
        id: data.categoryId,
      },
      club: fighterProfile.club,
    };

    EditFighterProfileMutate({ fighterProfileId, editFighterProfileRequest });
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
      <Dialog open={editFighterProfileDialogIsOpen}>
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
      <Dialog open={editFighterProfileDialogIsOpen}>
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

  return (
    <Dialog open={editFighterProfileDialogIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit fighter profile</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
          id="edit-fighter-profile-form"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstname" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                First name
              </Label>
              <Input
                id="firstname"
                type="string"
                defaultValue={formData?.firstname || ""}
                {...register("firstname", {
                  required: "Firstname is required",
                })}
              />
              {errors.firstname && (
                <span className="text-destructive">
                  {errors.firstname.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Last name
              </Label>
              <Input
                id="lastname"
                type="string"
                defaultValue={formData?.lastname || ""}
                {...register("lastname", {
                  required: "Lastname is required",
                })}
              />
              {errors.lastname && (
                <span className="text-destructive">
                  {errors.lastname.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label>Date of birth</Label>
              <div className="inline-flex items-center space-x-2">
                <Popover modal>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0"
                    align="start"
                    side="bottom"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(day) => day && setDate(day)}
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  type="text"
                  value={date.toLocaleDateString()}
                  readOnly
                  placeholder="Select a date..."
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">Gender</Label>
              <Controller
                name="gender"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    {...register("gender")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={field.value}
                        defaultValue={formData?.gender}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key={"gender-true"} value="male">
                        Male
                      </SelectItem>
                      <SelectItem key={"gender-false"} value="female">
                        Female
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && (
                <span className="text-destructive col-span-4">
                  This field is required
                </span>
              )}
            </div>
          </div>

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
                    defaultValue={String(
                      formData?.category ? formData.category.id : "",
                    )}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="space-y-2">
              <Label htmlFor="height">
                <Ruler size={16} /> Height
              </Label>
              <Input
                defaultValue={formData?.weight || ""}
                id="height"
                type="number"
                {...register("height", { required: "height is required" })}
              />
              {errors.height && (
                <span className="text-destructive">
                  {errors.height.message}
                </span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div className="col-span-3">
              <MultiSelectStyle
                styles={styles}
                fighterStyles={selectedStyles}
                onSelect={handeleSelectStyles}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="biography" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Biography
            </Label>
            <Textarea
              id="biography"
              rows={4}
              {...register("biography", {
                required: "biography is required",
              })}
            />
            {errors.biography && (
              <span className="text-destructive">
                {errors.biography.message}
              </span>
            )}
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={handleOncancel}>
            Cancel
          </Button>
          <Button type="submit" form="edit-fighter-profile-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
