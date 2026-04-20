"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/ui/Button";
import { useModal } from "../common/ModalManagerContext";
import { useDeleteTask } from "../tasks/DeleteTaskContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";

export function CreateSubtasksButton(
  props: ButtonProps & React.RefAttributes<HTMLButtonElement>,
) {
  const t = useTranslations("dashboard.subtasks.CreateSubtasksButton");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onModalOpenChange } = useModal("createSubtask");

  function handlePress() {
    guestGuard(() => onModalOpenChange(true));
  }

  // Disable button while the task is being deleted
  const { isPending: isDeleteTaskPending } = useDeleteTask();

  return (
    <Button
      {...props}
      data-test="create-subtask-button"
      variant="outlined"
      iconLeft={<Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      aria-label={t("label")}
      onPress={handlePress}
      isDisabled={isDeleteTaskPending}
    />
  );
}
