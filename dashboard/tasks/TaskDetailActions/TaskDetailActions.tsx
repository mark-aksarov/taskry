"use client";

import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDeleteTask } from "../DeleteTaskContext";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { NavigationButton } from "@/dashboard/common/NavigationButton";

export function TaskDetailActions() {
  const t = useTranslations("dashboard.tasks.TaskDetailActions");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete task: action state + form modal state
  const { isPending: isDeletePending } = useDeleteTask();
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteTask");

  // Edit task: action state + form modal state from context

  function handleDeletePress() {
    guestGuard(() => onDeleteModalOpenChange(true));
  }

  return (
    <>
      <div data-test="task-detail-actions" className="flex flex-col gap-2.5">
        <NavigationButton
          data-test="delete-task-button"
          onPress={handleDeletePress}
          variant="secondary"
          isPending={isDeletePending}
          iconLeft={<Trash size={18} strokeWidth={1.5} absoluteStrokeWidth />}
          label={t("delete")}
        />
      </div>
    </>
  );
}
