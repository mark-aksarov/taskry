"use client";

import { PersonImageModal } from "../../common/PersonImageModal";
import { useUpdateCustomerImage } from "../UpdateCustomerImageContext";
import { UpdateCustomerImageDialog } from "./UpdateCustomerImageDialog";

export function CustomerImageModal({ customerId }: { customerId: number }) {
  const { imageFile, onImageFileChange, isModalOpen, onModalOpenChange } =
    useUpdateCustomerImage();

  return (
    <PersonImageModal
      imageFile={imageFile}
      onImageFileChange={onImageFileChange}
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
      updatePersonImageDialog={
        <UpdateCustomerImageDialog customerId={customerId} />
      }
    />
  );
}
