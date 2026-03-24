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
import { useUpdateUserImage } from "../UpdateUserImageContext";
import { useUpdateUserImageFile } from "../UpdateUserImageFileContext";

export function UpdateUserImageDialog({ userId }: { userId: string }) {
  const editorRef = useRef<AvatarEditor>(null);

  const { state, action, isPending } = useUpdateUserImage();

  // UpdateUserImageDialog is rendered only when imageFile is not null, so we use imageFile!
  const { imageFile, onImageFileChange } = useUpdateUserImageFile();

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
