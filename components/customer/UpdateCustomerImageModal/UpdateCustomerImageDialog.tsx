"use client";

import {
  UpdatePersonImageEditor,
  UpdatePersonImageDialogBody,
  UpdatePersonImageErrorBanner,
  UpdatePersonImageDialogHeader,
  UpdatePersonImageActionButton,
} from "@/components/common/PersonImageModal";

import { useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { Dialog, DialogFooter } from "@/components/ui/Dialog";
import { useUpdateCustomerImage } from "../UpdateCustomerImageContext";
import { useUpdateCustomerImageFile } from "../UpdateCustomerImageFileContext";

export function UpdateCustomerImageDialog({
  customerId,
}: {
  customerId: number;
}) {
  const editorRef = useRef<AvatarEditor>(null);

  const { state, action, isPending } = useUpdateCustomerImage();

  // UpdateCustomerImageDialog is rendered only when imageFile is not null, so we use imageFile!
  const { imageFile, onImageFileChange } = useUpdateCustomerImageFile();

  return (
    <Dialog>
      <UpdatePersonImageDialogHeader setImageFile={onImageFileChange} />
      <UpdatePersonImageDialogBody>
        <UpdatePersonImageEditor ref={editorRef} imageFile={imageFile!} />
        <UpdatePersonImageErrorBanner
          updatePersonImageState={state}
          isUpdatePersonImagePending={isPending}
        />
      </UpdatePersonImageDialogBody>
      <DialogFooter>
        <UpdatePersonImageActionButton
          editorRef={editorRef}
          imageFile={imageFile!}
          updatePersonImageAction={(blob) => action({ id: customerId, blob })}
          isUpdatePersonImagePending={isPending}
        />
      </DialogFooter>
    </Dialog>
  );
}
