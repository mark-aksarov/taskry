"use client";

import {
  taskStatuses,
  ALLOWED_TASK_STATUSES_BY_PROJECT,
} from "@/lib/data/utils/statusUtils";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { EditTaskModal } from "../EditTaskModal";
import { startTransition, useActionState, useState } from "react";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { ItemBaseActionMenuTrigger } from "@/components/common/ItemBase";
import { DeleteEntityModal } from "@/components/common/DeleteEntityModal";
import { Check, CircleEllipsis, Clock, Pencil, Trash } from "lucide-react";

export type TaskItemActionMenuTriggerProps = {
  taskId: number;
  taskTitle: string;
  taskStatus: TaskStatus;
  projectStatus: ProjectStatus;
  className?: string;
  guestMode?: boolean;
  canDelete: boolean;
  canUpdate: boolean;
  canUpdateStatus: boolean;
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
  projectStatus,
  className,
  guestMode,
  canDelete,
  canUpdate,
  canUpdateStatus,
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

  const allowedStatuses = ALLOWED_TASK_STATUSES_BY_PROJECT[projectStatus];
  const statusDisabledKeys = taskStatuses.filter(
    (status) => !allowedStatuses.includes(status) || status === taskStatus,
  );

  const disabledKeys = [...statusDisabledKeys] as Key[];

  if (!canDelete && !guestMode) disabledKeys.push("delete");
  if (!canUpdate && !guestMode) disabledKeys.push("edit");
  if (!canUpdateStatus && !guestMode) {
    disabledKeys.push("pending", "completed", "active");
  }

  return (
    <>
      <ItemBaseActionMenuTrigger
        trigger-data-test={`task-item-${taskId}-action-menu-trigger`}
        className={className}
        onAction={handleAction}
        disabledKeys={disabledKeys}
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
