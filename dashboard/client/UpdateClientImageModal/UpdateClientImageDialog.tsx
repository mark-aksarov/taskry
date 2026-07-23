"use client";

import {
  UpdatePersonImageEditor,
  UpdatePersonImageDialogBody,
  UpdatePersonImageErrorBanner,
  UpdatePersonImageDialogHeader,
  UpdatePersonImageActionButton,
} from "@/dashboard/common/PersonImageModal";

import { useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { Dialog, DialogFooter } from "@/ui/Dialog";
import { useUpdateClientImage } from "../UpdateClientImageContext";
import { useUpdateClientImageFile } from "../UpdateClientImageFileContext";

export function UpdateClientImageDialog({
  clientId,
}: {
  clientId: number;
}) {
  const editorRef = useRef<AvatarEditor>(null);

  const { state, action, isPending } = useUpdateClientImage();

  // UpdateClientImageDialog is rendered only when imageFile is not null, so we use imageFile!
  const { imageFile, onImageFileChange } = useUpdateClientImageFile();

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
          updatePersonImageAction={(blob) => action({ id: clientId, blob })}
          isUpdatePersonImagePending={isPending}
        />
      </DialogFooter>
    </Dialog>
  );
}
