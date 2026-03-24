"use client";

import { PersonImageModal } from "../../common/PersonImageModal";
import { UpdateCustomerImageDialog } from "./UpdateCustomerImageDialog";
import { useUpdateCustomerImageFile } from "../UpdateCustomerImageFileContext";
import { useUpdateCustomerImageModal } from "./UpdateCustomerImageModalContext";

export function UpdateCustomerImageModal({
  customerId,
}: {
  customerId: number;
}) {
  const { isOpen, onOpenChange } = useUpdateCustomerImageModal();
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
