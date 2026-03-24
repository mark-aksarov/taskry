"use client";

import { UpdateUserImageDialog } from "./UpdateUserImageDialog";
import { PersonImageModal } from "../../common/PersonImageModal";
import { useUpdateUserImageFile } from "../UpdateUserImageFileContext";
import { useUpdateUserImageModal } from "./UpdateUserImageModalContext";

export function UpdateUserImageModal({ userId }: { userId: string }) {
  const { isOpen, onOpenChange } = useUpdateUserImageModal();
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
