"use client";

import { useTranslations } from "next-intl";
import { ButtonVariant } from "@/ui/Button";
import { useDeleteTask } from "./DeleteTaskContext";
import { useModal } from "@/common/ModalManagerContext";
import { DetailsDeleteButton } from "../common/DetailsDeleteButton";

interface DeleteTaskModalTriggerProps {
  buttonVariant: ButtonVariant;
}

export function DeleteTaskModalTrigger({
  buttonVariant,
}: DeleteTaskModalTriggerProps) {
  const t = useTranslations("dashboard.tasks.DeleteTaskModalTrigger");

  const { onOpenChange: onDeleteTaskModalOpenChange } = useModal("deleteTask");
  const { isPending } = useDeleteTask();

  return (
    <DetailsDeleteButton
      isPending={isPending}
      data-test="delete-task-modal-trigger"
      aria-label={t("label")}
      variant={buttonVariant}
      onPress={() => onDeleteTaskModalOpenChange(true)}
    />
  );
}
