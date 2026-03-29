"use client";

import { useTranslations } from "next-intl";
import { useDeleteTask } from "../DeleteTaskContext";
import { useUpdateTask } from "../UpdateTaskContext";
import { MessageSquare, Pencil, Trash } from "lucide-react";
import { useModal } from "@/components/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { NavigationButton } from "@/components/common/NavigationButton";

export function TaskDetailActions() {
  const t = useTranslations("tasks.TaskDetailActions");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete task: action state + form modal state
  const { isPending: isDeletePending } = useDeleteTask();
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteTask");

  // Edit task: action state + form modal state from context
  const { isPending: isUpdatePending } = useUpdateTask();
  const { onOpenChange: onUpdateModalOpenChange } = useModal("updateTask");

  const { onOpenChange: onCommentsModalOpenChange } = useModal("taskComments");

  function handleDeletePress() {
    guestGuard(() => onDeleteModalOpenChange(true));
  }

  function handleEditPress() {
    guestGuard(() => onUpdateModalOpenChange(true));
  }

  function handleCommentsPress() {
    onCommentsModalOpenChange(true);
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
        <NavigationButton
          data-test="edit-task-button"
          onPress={handleEditPress}
          variant="secondary"
          isPending={isUpdatePending}
          iconLeft={<Pencil size={18} strokeWidth={1.5} absoluteStrokeWidth />}
          label={t("edit")}
        />
        <NavigationButton
          data-test="task-comments-button"
          onPress={handleCommentsPress}
          variant="secondary"
          iconLeft={
            <MessageSquare size={18} strokeWidth={1.5} absoluteStrokeWidth />
          }
          label={t("comments")}
        />
      </div>
    </>
  );
}
