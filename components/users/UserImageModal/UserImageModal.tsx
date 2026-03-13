"use client";

import { useUpdateUserImage } from "../UpdateUserImageContext";
import { UpdateUserImageDialog } from "./UpdateUserImageDialog";
import { PersonImageModal } from "../../common/PersonImageModal";

export function UserImageModal({ userId }: { userId: string }) {
  const { imageFile, onImageFileChange, isModalOpen, onModalOpenChange } =
    useUpdateUserImage();

  return (
    <PersonImageModal
      imageFile={imageFile}
      onImageFileChange={onImageFileChange}
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
      updatePersonImageDialog={<UpdateUserImageDialog userId={userId} />}
    />
  );
}
