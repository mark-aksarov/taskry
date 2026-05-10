"use client";

import { useTranslations } from "next-intl";
import { ButtonVariant } from "@/ui/Button";
import { useDeleteTask } from "./DeleteTaskContext";
import { useModal } from "@/common/ModalManagerContext";
import { DetailsDeleteButton } from "../common/DetailsDeleteButton";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";

interface DeleteTaskModalTriggerProps {
  buttonVariant: ButtonVariant;
}

export function DeleteTaskModalTrigger({
  buttonVariant,
}: DeleteTaskModalTriggerProps) {
  const t = useTranslations("dashboard.tasks.DeleteTaskModalTrigger");

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onDeleteTaskModalOpenChange } = useModal("deleteTask");
  const { isPending } = useDeleteTask();

  const handlePress = () => {
    guestGuard(() => onDeleteTaskModalOpenChange(true));
  };

  return (
    <DetailsDeleteButton
      isPending={isPending}
      data-test="delete-task-modal-trigger"
      aria-label={t("label")}
      variant={buttonVariant}
      onPress={handlePress}
    />
  );
}
