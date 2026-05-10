"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { useDeleteProject } from "./DeleteProjectContext";
import { DetailsDeleteButton } from "../common/DetailsDeleteButton";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";

export function DeleteProjectModalTrigger() {
  const t = useTranslations("dashboard.projects.DeleteProjectModalTrigger");
  const guestGuard = useGuestModalGuard();
  const { onOpenChange: onDeleteProjectModalOpenChange } =
    useModal("deleteProject");
  const { isPending } = useDeleteProject();

  const handlePress = () => {
    guestGuard(() => onDeleteProjectModalOpenChange(true));
  };

  return (
    <DetailsDeleteButton
      isPending={isPending}
      data-test="delete-project-modal-trigger"
      aria-label={t("label")}
      onPress={handlePress}
    />
  );
}
