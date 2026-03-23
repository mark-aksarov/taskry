"use client";

import { useUpdateUserImage } from "./UpdateUserImageContext";
import { useClearUserImageUrl } from "./ClearUserImageUrlContext";
import { PersonImageMenuTrigger } from "../common/PersonImageMenuTrigger";
import { useDeleteUserImageModal } from "./DeleteUserImageModal/DeleteUserImageModalContext";

export function UserImageMenuTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    isPending: isUpdatePending,
    onModalOpenChange: onUpdateModalOpenChange,
  } = useUpdateUserImage();

  const { isPending: isDeletePending } = useClearUserImageUrl();
  const { onOpenChange: onDeleteModalOpenChange } = useDeleteUserImageModal();

  return (
    <PersonImageMenuTrigger
      onDelete={() => onDeleteModalOpenChange(true)}
      onUpdate={() => onUpdateModalOpenChange(true)}
      isDisabled={isUpdatePending || isDeletePending}
    >
      {children}
    </PersonImageMenuTrigger>
  );
}
