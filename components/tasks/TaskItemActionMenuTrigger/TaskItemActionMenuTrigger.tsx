"use client";

import {
  ActionFn,
  ActionState,
  DeleteTasksPayload,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/components/common/ItemBase";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { EditTaskModal } from "../EditTaskModal";
import { DeleteTaskModal } from "../DeleteTaskModal";
import { TaskStatus } from "@/generated/prisma/enums";
import { startTransition, useActionState, useState } from "react";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { Check, CircleEllipsis, Clock, Pencil, Trash } from "lucide-react";

export type TaskItemActionMenuTriggerProps = {
  guestMode: boolean;
  taskId: number;
  taskTitle: string;
  taskStatus: TaskStatus;
  className?: string;
  deleteAction: ActionFn<ActionState, DeleteTasksPayload>;
  updateStatusAction: ActionFn<ActionState, UpdateTaskStatusesPayload>;
  editTaskFormContainer: React.ReactNode;
};

const initialState: ActionState = {
  status: null,
};

export function TaskItemActionMenuTrigger({
  guestMode,
  taskId,
  taskTitle,
  taskStatus,
  className,
  deleteAction,
  updateStatusAction,
  editTaskFormContainer,
}: TaskItemActionMenuTriggerProps) {
  const t = useTranslations("tasks.TaskItemActionMenuTrigger");

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the task
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  // Modal state for deleting the task
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  // State and action handler for updating task status
  const [
    updateTaskStatusState,
    updateTaskStatusAction,
    updateTaskStatusPending,
  ] = useActionState(updateStatusAction, initialState);

  // Show toast for status update errors
  useActionErrorToast(updateTaskStatusState, t("error.updateStatusError"));

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
      setIsOpenDeleteModal(true);
    } else {
      startTransition(() => {
        updateTaskStatusAction({
          ids: [taskId],
          nextStatus: action as TaskStatus,
        });
      });
    }
  }

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        disabledKeys={[taskStatus]}
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

      {/* Modal for confirming task deletion */}
      <DeleteTaskModal
        taskId={taskId}
        taskTitle={taskTitle}
        isOpen={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
        deleteAction={deleteAction}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
