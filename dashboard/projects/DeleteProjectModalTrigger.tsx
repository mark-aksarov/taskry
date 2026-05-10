"use client";

import { useTranslations } from "next-intl";
import { ButtonVariant } from "@/ui/Button";
import { useModal } from "@/common/ModalManagerContext";
import { useDeleteProject } from "./DeleteProjectContext";
import { DetailsDeleteButton } from "../common/DetailsDeleteButton";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";

interface DeleteProjectModalTriggerProps {
  buttonVariant: ButtonVariant;
}

export function DeleteProjectModalTrigger({
  buttonVariant,
}: DeleteProjectModalTriggerProps) {
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
      variant={buttonVariant}
      data-test="delete-project-modal-trigger"
      aria-label={t("label")}
      onPress={handlePress}
    />
  );
}
