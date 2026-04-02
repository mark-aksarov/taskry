"use client";

import { useIsMd } from "@/lib/hooks/useIsMd";
import { Modal } from "@/components/ui/Modal";
import { UploadPersonImageDialog } from "./UploadPersonImageDialog";
import { overlayTransitionDuration } from "@/components/ui/styles";

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
  const isMd = useIsMd();

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setTimeout(() => {
        onImageFileChange(null);
      }, overlayTransitionDuration);
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
