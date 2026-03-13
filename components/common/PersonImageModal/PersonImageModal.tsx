"use client";

import { Modal } from "@/components/ui/Modal";
import { useMediaQuery } from "react-responsive";
import { UploadPersonImageDialog } from "./UploadPersonImageDialog";

interface PersonImageModalProps {
  imageFile: File | null;
  onImageFileChange: (file: File | null) => void;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  updatePersonImageDialog: React.ReactNode;
}

export function PersonImageModal({
  imageFile,
  onImageFileChange,
  isOpen,
  onOpenChange,
  updatePersonImageDialog,
}: PersonImageModalProps) {
  const isMd = useMediaQuery({ query: "(max-width: 47.999rem)" });

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setTimeout(() => {
        onImageFileChange(null);
      }, 150);
    }

    onOpenChange(isOpen);
  };

  return (
    <Modal
      data-test="person-image-modal"
      fullscreen={isMd && imageFile !== null}
      className={
        imageFile !== null
          ? "md:w-[500px]"
          : "w-[420px] max-w-[calc(100vw-var(--spacing)*8)]"
      }
      isOpen={isOpen}
      isDismissable
      onOpenChange={handleOpenChange}
    >
      {imageFile ? (
        updatePersonImageDialog
      ) : (
        <UploadPersonImageDialog setImageFile={onImageFileChange} />
      )}
    </Modal>
  );
}
