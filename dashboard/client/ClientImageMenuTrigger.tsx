"use client";

import { useModal } from "../../common/ModalManagerContext";
import { useUpdateClientImage } from "./UpdateClientImageContext";
import { PersonImageMenuTrigger } from "../common/PersonImageMenuTrigger";
import { useClearClientImageUrl } from "./ClearClientImageUrlContext";
import { useTranslations } from "next-intl";

interface ClientImageMenuTriggerProps {
  showDeleteMenuItem: boolean;
  children: React.ReactNode;
}

export function ClientImageMenuTrigger({
  showDeleteMenuItem,
  children,
}: ClientImageMenuTriggerProps) {
  const t = useTranslations("dashboard.clients.ClientImageMenuTrigger");

  const { isPending: isUpdatePending } = useUpdateClientImage();
  const { onOpenChange: onUpdateModalOpenChange } = useModal(
    "updateClientImage",
  );

  const { isPending: isDeletePending } = useClearClientImageUrl();
  const { onOpenChange: onDeleteModalOpenChange } = useModal(
    "deleteClientImage",
  );

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
