"use client";

import { useModal } from "../common/ModalManagerContext";
import { useUpdateUserImage } from "./UpdateUserImageContext";
import { useClearUserImageUrl } from "./ClearUserImageUrlContext";
import { PersonImageMenuTrigger } from "../common/PersonImageMenuTrigger";

export function UserImageMenuTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPending: isUpdatePending } = useUpdateUserImage();
  const { onOpenChange: onUpdateModalOpenChange } = useModal("updateUserImage");

  const { isPending: isDeletePending } = useClearUserImageUrl();
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteUserImage");

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
