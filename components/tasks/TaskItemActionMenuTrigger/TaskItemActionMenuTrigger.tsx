"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/components/common/ItemBase";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { EditTaskModal } from "../EditTaskModal";
import { startTransition, useState } from "react";
import { TaskStatus } from "@/generated/prisma/enums";
import { useDeleteTaskModal } from "../DeleteTaskModal";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { useUpdateTaskStatusContext } from "../UpdateTaskStatusContext";
import { Check, CircleEllipsis, Clock, Pencil, Trash } from "lucide-react";

export type TaskItemActionMenuTriggerProps = {
  guestMode: boolean;
  taskId: number;
  taskTitle: string;
  taskStatus: TaskStatus;
  className?: string;
  editTaskFormContainer: React.ReactNode;
};

export function TaskItemActionMenuTrigger({
  guestMode,
  taskId,
  taskTitle,
  taskStatus,
  className,
  editTaskFormContainer,
}: TaskItemActionMenuTriggerProps) {
  const t = useTranslations("tasks.TaskItemActionMenuTrigger");

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the task
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  // Modal state for deleting the task
  const { setState: setDeleteTaskModalState } = useDeleteTaskModal();

  // State and action handler for updating task status
  const {
    action: updateTaskStatusAction,
    isPending: isUpdateTaskStatusPending,
  } = useUpdateTaskStatusContext();

  // Handle menu actions
  function handleAction(key: Key) {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    const action = key.toString();
    if (action === "edit") {
      setIsOpenEditModal(true);
    } else if (action === "delete") {
      setDeleteTaskModalState({
        isOpen: true,
        taskId,
        taskTitle,
      });
    } else {
      startTransition(() => {
        updateTaskStatusAction({
          ids: [taskId],
          nextStatus: action as TaskStatus,
        });
      });
    }
  }

  const disabledKeys = isUpdateTaskStatusPending
    ? ["pending", "active", "completed"]
    : [taskStatus];

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        disabledKeys={disabledKeys}
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <ItemBaseActionMenuButton
            className={className}
            data-test="task-item-action-menu-trigger"
            data-id={taskId}
          />
        )}
      >
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

      {/* Modal for editing task details */}
      <EditTaskModal
        isOpen={isOpenEditModal}
        onOpenChange={setIsOpenEditModal}
        editTaskFormContainer={editTaskFormContainer}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
