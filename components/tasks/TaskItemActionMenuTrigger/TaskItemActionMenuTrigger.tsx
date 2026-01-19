"use client";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { EditTaskModal } from "../EditTaskModal";
import { TaskStatus } from "@/generated/prisma/enums";
import { startTransition, useActionState, useState } from "react";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { ItemBaseActionMenuTrigger } from "@/components/common/ItemBase";
import { DeleteEntityModal } from "@/components/common/DeleteEntityModal";
import { Check, CircleEllipsis, Clock, Pencil, Trash } from "lucide-react";

export type TaskItemActionMenuTriggerProps = {
  taskId: number;
  taskTitle: string;
  taskStatus: TaskStatus;
  className?: string;
  guestMode?: boolean;
  deleteAction: ActionFn<ActionState, DeleteProjectsPayload>;
  updateStatusAction: ActionFn<ActionState, UpdateTaskStatusesPayload>;
};

const initialState: ActionState = {
  status: null,
  message: null,
};

export function TaskItemActionMenuTrigger({
  taskId,
  taskTitle,
  taskStatus,
  className,
  guestMode,
  deleteAction,
  updateStatusAction,
}: TaskItemActionMenuTriggerProps) {
  const t = useTranslations("tasks.TaskItemActionMenuTrigger");

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Edit State
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  // Delete State
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  // Update Status
  const [
    updateTaskStatusState,
    updateTaskStatusAction,
    updateTaskStatusPending,
  ] = useActionState(updateStatusAction, initialState);

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

  useActionErrorToast(updateTaskStatusState);

  return (
    <>
      <ItemBaseActionMenuTrigger
        trigger-data-test={`task-item-${taskId}-action-menu-trigger`}
        className={className}
        onAction={handleAction}
        disabledKeys={[taskStatus]}
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

      <EditTaskModal
        taskId={taskId}
        isOpen={isOpenEditModal}
        onOpenChange={setIsOpenEditModal}
      />

      <DeleteEntityModal
        entityId={taskId}
        entityName={taskTitle}
        translationNamespace="tasks.DeleteTaskModal"
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
