"use client";

import { PersonImageModal } from "../../common/PersonImageModal";
import { useModal } from "@/common/ModalManagerContext";
import { UpdateCustomerImageDialog } from "./UpdateCustomerImageDialog";
import { useUpdateCustomerImageFile } from "../UpdateCustomerImageFileContext";

export function UpdateCustomerImageModal({
  customerId,
}: {
  customerId: number;
}) {
  const { isOpen, onOpenChange } = useModal("updateCustomerImage");
  const { imageFile, onImageFileChange } = useUpdateCustomerImageFile();

  return (
    <PersonImageModal
      imageFile={imageFile}
      onImageFileChange={onImageFileChange}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      updatePersonImageDialog={
        <UpdateCustomerImageDialog customerId={customerId} />
      }
    />
  );
}
