"use client";

import { UpdateUserImageDialog } from "./UpdateUserImageDialog";
import { PersonImageModal } from "../../common/PersonImageModal";
import { useModal } from "@/common/ModalManagerContext";
import { useUpdateUserImageFile } from "../UpdateUserImageFileContext";

export function UpdateUserImageModal({ userId }: { userId: string }) {
  const { isOpen, onOpenChange } = useModal("updateUserImage");
  const { imageFile, onImageFileChange } = useUpdateUserImageFile();

  return (
    <PersonImageModal
      imageFile={imageFile}
      onImageFileChange={onImageFileChange}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      updatePersonImageDialog={<UpdateUserImageDialog userId={userId} />}
    />
  );
}
