"use client";

import { useTranslations } from "next-intl";
import { useDeleteTask } from "./DeleteTaskContext";
import { useModal } from "../common/ModalManagerContext";
import { DetailsDeleteButton } from "../common/DetailsDeleteButton";

export function DeleteTaskModalTrigger() {
  const t = useTranslations("tasks.DeleteTaskModalTrigger");

  const { onOpenChange: onDeleteTaskModalOpenChange } = useModal("deleteTask");
  const { isPending } = useDeleteTask();

  return (
    <DetailsDeleteButton
      isPending={isPending}
      data-test="delete-task-modal-trigger"
      aria-label={t("label")}
      onPress={() => onDeleteTaskModalOpenChange(true)}
    />
  );
}
