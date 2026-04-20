"use client";

import { useModal } from "../common/ModalManagerContext";
import { useUpdateUserImage } from "./UpdateUserImageContext";
import { useClearUserImageUrl } from "./ClearUserImageUrlContext";
import { PersonImageMenuTrigger } from "../common/PersonImageMenuTrigger";
import { useTranslations } from "next-intl";

interface UserImageMenuTriggerProps {
  showDeleteMenuItem: boolean;
  children: React.ReactNode;
}

export function UserImageMenuTrigger({
  showDeleteMenuItem,
  children,
}: UserImageMenuTriggerProps) {
  const t = useTranslations("dashboard.users.UserImageMenuTrigger");

  const { isPending: isUpdatePending } = useUpdateUserImage();
  const { onOpenChange: onUpdateModalOpenChange } = useModal("updateUserImage");

  const { isPending: isDeletePending } = useClearUserImageUrl();
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteUserImage");

  return (
    <PersonImageMenuTrigger
      showDeleteMenuItem={showDeleteMenuItem}
      onDelete={() => onDeleteModalOpenChange(true)}
      onUpdate={() => onUpdateModalOpenChange(true)}
      isDisabled={isUpdatePending || isDeletePending}
      aria-label={t("label")}
    >
      {children}
    </PersonImageMenuTrigger>
  );
}
