"use client";

import {
  Info,
  Check,
  Clock,
  Trash,
  Pencil,
  CircleEllipsis,
} from "lucide-react";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/components/common/ItemBase";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { startTransition, useState } from "react";
import { DeleteTaskModal } from "../DeleteTaskModal";
import { useUpdateTask } from "../UpdateTaskContext";
import { TaskStatus } from "@/generated/prisma/enums";
import { useTaskItemPending } from "./useTaskItemPending";
import { useUpdateTaskStatus } from "../UpdateTaskStatusContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";

export type TaskItemActionMenuTriggerProps = {
  taskId: number;
  taskTitle: string;
  taskStatus: TaskStatus;
  className?: string;
};

export function TaskItemActionMenuTrigger({
  taskId,
  taskTitle,
  taskStatus,
  className,
}: TaskItemActionMenuTriggerProps) {
  const t = useTranslations("tasks.TaskItemActionMenuTrigger");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State for edit modal from context
  const { onModalOpenChange: onEditModalOpenChange } = useUpdateTask();

  // State for update task status from context
  const {
    isPending: isUpdateTaskStatusPending,
    action: updateTaskStatusAction,
  } = useUpdateTaskStatus();

  /**
   * Handles menu actions for a task item:
   * 1. If the user is a guest, show the guest mode modal.
   * 2. If action is "details", do nothing.
   * 3. If action is "edit", open the edit modal.
   * 4. If action is "delete", open the delete confirmation modal.
   * 5. Otherwise, treat the action as a task status update
   *    and trigger the updateProjectStatusAction for this task.
   */
  function handleAction(key: Key) {
    guestGuard(() => {
      const action = key.toString();

      if (action === "details") {
        return;
      }

      if (action === "edit") {
        onEditModalOpenChange(true);
      } else if (action === "delete") {
        setIsDeleteModalOpen(true);
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
    <>
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
        <Item href={`/tasks/${taskId}`} textValue={t("details")} key="details">
          <Info size={16} /> {t("details")}
        </Item>
        <Item textValue={t("edit")} key="edit">
          <Pencil size={16} /> {t("edit")}
        </Item>
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} /> {t("delete")}
        </Item>
        <Item textValue={t("markPending")} key="pending">
          <CircleEllipsis size={16} /> {t("markPending")}
        </Item>
        <Item textValue={t("markCompleted")} key="completed">
          <Check size={16} /> {t("markCompleted")}
        </Item>
        <Item textValue={t("markActive")} key="active">
          <Clock size={16} /> {t("markActive")}
        </Item>
      </ItemBaseActionMenuTrigger>

      <DeleteTaskModal
        taskId={taskId}
        taskTitle={taskTitle}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />
    </>
  );
}
