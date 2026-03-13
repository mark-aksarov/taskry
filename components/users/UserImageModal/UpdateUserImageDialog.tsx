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
import { useUpdateUserImage } from "../UpdateUserImageContext";

export function UpdateUserImageDialog({ userId }: { userId: string }) {
  const editorRef = useRef<AvatarEditor>(null);

  // UpdateUserImageDialog is rendered only when imageFile is not null
  const { imageFile, onImageFileChange, state, action, isPending } =
    useUpdateUserImage();

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
          updatePersonImageAction={(blob) => action({ id: userId, blob })}
          isUpdatePersonImagePending={isPending}
        />
      </DialogFooter>
    </Dialog>
  );
}
