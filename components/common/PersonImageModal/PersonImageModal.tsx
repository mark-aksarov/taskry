"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useMediaQuery } from "react-responsive";
import { ChangeProfileImageDialog } from "./ChangeProfileImageDialog";
import { UploadProfileImageDialog } from "./UploadProfileImageDialog";

interface ChangePersonImageModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function PersonImageModal({
  isOpen,
  onOpenChange,
}: ChangePersonImageModalProps) {
  let [imageFile, setImageFile] = useState<File | null>(null);
  const isMd = useMediaQuery({ query: "(max-width: 47.999rem)" });

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setTimeout(() => {
        setImageFile(null);
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
        <ChangeProfileImageDialog
          imageFile={imageFile}
          setImageFile={setImageFile}
        />
      ) : (
        <UploadProfileImageDialog setImageFile={setImageFile} />
      )}
    </Modal>
  );
}
