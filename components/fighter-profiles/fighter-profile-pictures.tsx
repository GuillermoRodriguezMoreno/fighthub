import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";

import { Dialog, DialogClose, DialogContent } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { CircleX, Edit } from "lucide-react";
import { useState } from "react";
import PictureUpload from "../pictures/picture-upload";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { DEFAULT_IMAGE_URL } from "@/domains/utils";
import { FighterProfileResponse } from "@/domains/fighter-profile";
import { useUploadFighterProfilePictureMutation } from "@/hooks/fighter_profile/use-upload-fighter-picture-mutation";
import { ImageSkeleton } from "../core/image-skeleton";

type FighterPicturesProps = {
  isAuthorized?: boolean;
  fighterProfile: FighterProfileResponse;
};
export function FighterProfilePictures({
  isAuthorized = false,
  fighterProfile,
}: FighterPicturesProps) {
  const [uploadPictureDialogIsOpen, setUploadPictureDialogIsOpen] =
    useState(false);
  const handleUploadPicture = () => {
    setUploadPictureDialogIsOpen(true);
  };
  const handleCloseUploadPicture = () => {
    setUploadPictureDialogIsOpen(false);
  };

  const { mutate: uploadMutation } = useUploadFighterProfilePictureMutation(
    fighterProfile.id,
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-5">
        <h2 className="text-2xl font-bold">Image</h2>
        {isAuthorized ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleUploadPicture}>
                <Edit />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Upload image</p>
            </TooltipContent>
          </Tooltip>
        ) : null}
      </div>
      {fighterProfile.profilePicture ? (
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <div className="p-1 ">
                <Card className="flex rounded-md overflow-hidden p-0 ">
                  <CardContent className="relative w-full aspect-square p-0">
                    <Image
                      src={fighterProfile.profilePicture || DEFAULT_IMAGE_URL}
                      alt={`Imagen`}
                      fill
                      className="object-cover rounded-md hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                  </CardContent>
                </Card>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-0 bg-transparent shadow-none">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={fighterProfile.profilePicture || DEFAULT_IMAGE_URL}
                  alt={`Imagen`}
                  width={800}
                  height={480}
                  className="rounded-md object-contain"
                />
                <DialogClose asChild>
                  <Button className="absolute top-4 right-4" aria-label="close">
                    <CircleX />
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <ImageSkeleton />
      )}

      <PictureUpload
        isOpen={uploadPictureDialogIsOpen}
        onCancel={handleCloseUploadPicture}
        onUpload={uploadMutation}
      />
    </div>
  );
}
