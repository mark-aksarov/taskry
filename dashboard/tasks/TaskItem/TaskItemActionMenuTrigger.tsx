"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/dashboard/common/ItemBase";

import { startTransition } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { TaskStatus } from "@/generated/prisma/enums";
import { useTaskItemPending } from "./useTaskItemPending";
import { useUpdateTaskStatus } from "../UpdateTaskStatusContext";
import { useModal } from "@/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { Check, Clock, Trash, Pencil, CircleEllipsis } from "lucide-react";

export type TaskItemActionMenuTriggerProps = {
  taskId: number;
  taskStatus: TaskStatus;
  className?: string;
};

export function TaskItemActionMenuTrigger({
  taskId,
  taskStatus,
  className,
}: TaskItemActionMenuTriggerProps) {
  const t = useTranslations("dashboard.tasks.TaskItemActionMenuTrigger");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteTask");

  // State for edit modal from context
  const { onOpenChange: onUpdateModalOpenChange } = useModal("updateTask");

  // State for update task status from context
  const {
    isPending: isUpdateTaskStatusPending,
    action: updateTaskStatusAction,
  } = useUpdateTaskStatus();

  /**
   * Handles menu actions for a task item:
   *  If the user is a guest, show the guest mode modal.
   *  If action is "edit", open the edit modal.
   *  If action is "delete", open the delete confirmation modal.
   *  Otherwise, treat the action as a task status update
   *    and trigger the updateProjectStatusAction for this task.
   */
  function handleAction(key: Key) {
    guestGuard(() => {
      const action = key.toString();

      if (action === "edit") {
        onUpdateModalOpenChange(true);
      } else if (action === "delete") {
        onDeleteModalOpenChange(true);
      } else {
        startTransition(() => {
          updateTaskStatusAction({
            id: taskId,
            nextStatus: action as TaskStatus,
          });
        });
      }
    });
  }

  // Disable status-related menu items while a task update is in progress,
  // otherwise disable only the current task status.
  const disabledKeys = isUpdateTaskStatusPending
    ? ["pending", "active", "completed"]
    : [taskStatus];

  //Pending state while deleting or updating
  const isPending = useTaskItemPending(taskId);

  return (
    <ItemBaseActionMenuTrigger
      onAction={handleAction}
      disabledKeys={disabledKeys}
      renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
      renderButton={() => (
        <ItemBaseActionMenuButton
          className={className}
          isPending={isPending}
          data-test="task-item-action-menu-trigger"
          data-id={taskId}
        />
      )}
    >
      <Item textValue={t("edit")} key="edit">
        <Pencil  /> {t("edit")}
      </Item>
      <Item textValue={t("delete")} key="delete">
        <Trash  /> {t("delete")}
      </Item>
      <Item textValue={t("markPending")} key="pending">
        <CircleEllipsis  /> {t("markPending")}
      </Item>
      <Item textValue={t("markActive")} key="active">
        <Clock  /> {t("markActive")}
      </Item>
      <Item textValue={t("markCompleted")} key="completed">
        <Check  /> {t("markCompleted")}
      </Item>
    </ItemBaseActionMenuTrigger>
  );
}
