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

import {
  ActionFn,
  ActionState,
  DeleteTasksPayload,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { EditTaskModal } from "../EditTaskModal";
import { DeleteTaskModal } from "../DeleteTaskModal";
import { TaskStatus } from "@/generated/prisma/enums";
import { useCurrentUser } from "../../common/CurrentUserContext";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { useDeleteTaskTransition } from "../DeleteTaskTransitionContext";
import { useUpdateTaskStatusTransition } from "../UpdateTaskStatusTransitionContext";
import { useUpdateEntityStatusActionState } from "@/lib/hooks/useUpdateEntityStatusActionState";
import { useTaskItemPending } from "./useTaskItemPending";

export type TaskItemActionMenuTriggerProps = {
  taskId: number;
  taskTitle: string;
  taskStatus: TaskStatus;
  className?: string;
  editTaskFormContainer: React.ReactNode;
  deleteTask: ActionFn<ActionState, DeleteTasksPayload>;
  updateTaskStatus: ActionFn<ActionState, UpdateTaskStatusesPayload>;
};

export function TaskItemActionMenuTrigger({
  taskId,
  taskTitle,
  taskStatus,
  className,
  editTaskFormContainer,
  deleteTask,
  updateTaskStatus,
}: TaskItemActionMenuTriggerProps) {
  const t = useTranslations("tasks.TaskItemActionMenuTrigger");

  // Deleting the task
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Guest mode
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the task
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  // updating task status
  const [, updateTaskStatusAction] = useUpdateEntityStatusActionState({
    updateEntityStatus: updateTaskStatus,
  });
  const {
    isPending: isUpdateTaskStatusPending,
    startTransition: startUpdateTaskStatusTransition,
  } = useUpdateTaskStatusTransition();

  // Handle menu actions
  function handleAction(key: Key) {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    const action = key.toString();

    if (action === "details") {
      return;
    }

    if (action === "edit") {
      setIsOpenEditModal(true);
    } else if (action === "delete") {
      setIsDeleteModalOpen(true);
    } else {
      startUpdateTaskStatusTransition(() => {
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

      {/* Modal for editing task details */}
      <EditTaskModal
        isOpen={isOpenEditModal}
        onOpenChange={setIsOpenEditModal}
        editTaskFormContainer={editTaskFormContainer}
      />

      <DeleteTaskModal
        taskId={taskId}
        taskTitle={taskTitle}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        deleteTask={deleteTask}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
