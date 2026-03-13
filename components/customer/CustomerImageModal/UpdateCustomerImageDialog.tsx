"use client";

import {
  UpdatePersonImageEditor,
  UpdatePersonImageDialogBody,
  UpdatePersonImageErrorBanner,
  UpdatePersonImageDialogHeader,
  UpdatePersonImageActionButton,
} from "../../common/PersonImageModal";

import { useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { Dialog, DialogFooter } from "@/components/ui/Dialog";
import { useUpdateCustomerImage } from "../UpdateCustomerImageContext";

export function UpdateCustomerImageDialog({
  customerId,
}: {
  customerId: number;
}) {
  const editorRef = useRef<AvatarEditor>(null);

  // UpdateCustomerImageDialog is rendered only when imageFile is not null
  const { imageFile, onImageFileChange, state, action, isPending } =
    useUpdateCustomerImage();

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
