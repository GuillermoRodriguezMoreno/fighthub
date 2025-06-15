import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";

import { Dialog, DialogClose, DialogContent } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { CircleX, Edit, Pen, Plus } from "lucide-react";
import { useState } from "react";
import PictureUpload from "../pictures/picture-upload";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { DEFAULT_IMAGE_URL } from "@/domains/utils";
import { useUploadClubPictureMutation } from "@/hooks/club/use-upload-club-picture-mutation";
import { ClubResponse } from "@/domains/club";

type ClubPicturesProps = {
  isOwner?: boolean;
  club: ClubResponse;
};
export function ClubPictures({ isOwner = false, club }: ClubPicturesProps) {
  const [uploadPictureDialogIsOpen, setUploadPictureDialogIsOpen] =
    useState(false);
  const handleUploadPicture = () => {
    setUploadPictureDialogIsOpen(true);
  };
  const handleCloseUploadPicture = () => {
    setUploadPictureDialogIsOpen(false);
  };

  const { mutate: uploadMutation } = useUploadClubPictureMutation(club.id);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-5">
        <h2 className="text-2xl font-bold">Image</h2>
        {isOwner ? (
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
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <div className="p-1 ">
              <Card className="flex rounded-md overflow-hidden p-0 ">
                <CardContent className="relative w-full aspect-square p-0">
                  <Image
                    src={club.profilePicture || DEFAULT_IMAGE_URL}
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
                src={club.profilePicture || DEFAULT_IMAGE_URL}
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
      <PictureUpload
        isOpen={uploadPictureDialogIsOpen}
        onCancel={handleCloseUploadPicture}
        onUpload={uploadMutation}
      />
    </div>
  );
}
