"use client";

import { useUpdateUserImage } from "./UpdateUserImageContext";
import { PersonImageMenuTrigger } from "../common/PersonImageMenuTrigger";
import { useDeleteUserImage } from "./DeleteUserImageContext/DeleteUserImageContext";

export function UserImageMenuTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    isPending: isUpdatePending,
    onModalOpenChange: onUpdateModalOpenChange,
  } = useUpdateUserImage();

  const {
    isPending: isDeletePending,
    onModalOpenChange: onDeleteModalOpenChange,
  } = useDeleteUserImage();

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
