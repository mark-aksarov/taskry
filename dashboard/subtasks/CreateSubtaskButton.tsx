"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/ui/Button";
import { useModal } from "../../common/ModalManagerContext";
import { useDeleteTask } from "../tasks/DeleteTaskContext";

export function CreateSubtasksButton(props: ButtonProps) {
  const t = useTranslations("dashboard.subtasks.CreateSubtasksButton");

  const { onOpenChange: onModalOpenChange } = useModal("createSubtask");

  function handlePress() {
    onModalOpenChange(true);
  }

  // Disable button while the task is being deleted
  const { isPending: isDeleteTaskPending } = useDeleteTask();

  return (
    <Button
      {...props}
      data-test="create-subtask-button"
      variant="primary"
      outlined
      iconLeft={<Plus />}
      aria-label={t("label")}
      onPress={handlePress}
      isDisabled={isDeleteTaskPending}
    />
  );
}
