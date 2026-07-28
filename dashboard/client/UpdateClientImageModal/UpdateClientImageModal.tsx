"use client";

import { PersonImageModal } from "../../common/PersonImageModal";
import { useModal } from "@/common/ModalManagerContext";
import { UpdateClientImageDialog } from "./UpdateClientImageDialog";
import { useUpdateClientImageFile } from "../UpdateClientImageFileContext";

export function UpdateClientImageModal({ clientId }: { clientId: number }) {
  const { isOpen, onOpenChange } = useModal("updateClientImage");
  const { imageFile, onImageFileChange } = useUpdateClientImageFile();

  return (
    <PersonImageModal
      imageFile={imageFile}
      onImageFileChange={onImageFileChange}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      updatePersonImageDialog={<UpdateClientImageDialog clientId={clientId} />}
    />
  );
}
