"use client";

import {
  taskStatuses,
  ALLOWED_TASK_STATUSES_BY_PROJECT,
} from "@/lib/data/utils/statusUtils";

import {
  ActionFn,
  ActionState,
  DeleteTasksPayload,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { ToolbarActionsMenuTrigger } from "../common/Toolbar";
import { useTaskSelection } from "@/lib/hooks/useTaskSelection";
import { startTransition, useActionState, useState } from "react";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { BulkDeleteEntityModal } from "../common/BulkDeleteEntityModal";
import { UpdateTaskStatusRestrictedModal } from "./UpdateTaskStatusRestrictedModal";

interface TaskToolbarActionsMenuTriggerProps {
  canDelete: boolean;
  deleteAction: ActionFn<ActionState, DeleteTasksPayload>;
  updateStatusAction: ActionFn<ActionState, UpdateTaskStatusesPayload>;
}

interface UpdateStatusModalState {
  isOpen: boolean;
  nextStatus: TaskStatus;
}

const initialState: ActionState = {
  status: null,
  message: null,
};

const isTaskStatusAllowedByProject = (
  task: { status: TaskStatus; projectStatus: ProjectStatus },
  nextStatus: TaskStatus,
) => {
  const allowedStatuses = ALLOWED_TASK_STATUSES_BY_PROJECT[task.projectStatus];
  return allowedStatuses.includes(nextStatus);
};

export const TaskToolbarActionsMenuTrigger = ({
  canDelete,
  deleteAction,
  updateStatusAction,
}: TaskToolbarActionsMenuTriggerProps) => {
  const t = useTranslations("tasks.TaskToolbarActionsMenuTrigger");
  const {
    selectedIds: selectedTaskIds,
    clearSelectedIds,
    selectedItems: selectedTaskItems,
  } = useTaskSelection();

  // Delete
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Update status modal
  const [updateModal, setUpdateModal] = useState<UpdateStatusModalState>({
    isOpen: false,
    nextStatus: "completed",
  });

  const [updateTaskStatusState, updateTaskStatusAction] = useActionState(
    updateStatusAction,
    initialState,
  );

  const handleAction = (key: Key) => {
    if (key === "delete") {
      setIsDeleteModalOpen(true);
      return;
    }

    const nextStatus = key as TaskStatus;

    const hasSkippedTasks = selectedTaskItems.some((task) => {
      return !isTaskStatusAllowedByProject(task, nextStatus);
    });

    if (hasSkippedTasks) {
      setUpdateModal({ isOpen: true, nextStatus });
    } else {
      startTransition(() => {
        updateTaskStatusAction({ ids: selectedTaskIds, nextStatus });
      });
    }
  };

  useActionErrorToast(updateTaskStatusState);

  const statusDisabledKeys = taskStatuses.filter((status) =>
    selectedTaskItems.every(
      (task) =>
        !isTaskStatusAllowedByProject(task, status) || task.status === status,
    ),
  );

  const disabledKeys = [...statusDisabledKeys] as Key[];

  if (!canDelete) disabledKeys.push("delete");

  return (
    <>
      <ToolbarActionsMenuTrigger
        onAction={handleAction}
        isDisabled={selectedTaskIds.length === 0}
        disabledKeys={disabledKeys}
      >
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("delete")}
        </Item>
        <Item textValue={t("pending")} key="pending">
          <CircleEllipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("pending")}
        </Item>
        <Item textValue={t("active")} key="active">
          <Check size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("active")}
        </Item>
        <Item textValue={t("completed")} key="completed">
          <Clock size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("completed")}
        </Item>
      </ToolbarActionsMenuTrigger>

      <BulkDeleteEntityModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        entityIds={selectedTaskIds}
        deleteAction={deleteAction}
        translationNamespace="tasks.BulkDeleteTaskModal"
        onSuccess={clearSelectedIds}
      />

      <UpdateTaskStatusRestrictedModal
        isOpen={updateModal.isOpen}
        nextStatus={updateModal.nextStatus}
        onOpenChange={(open) =>
          setUpdateModal((prev) => ({ ...prev, isOpen: open }))
        }
        taskIds={selectedTaskIds}
        updateStatusAction={updateStatusAction}
      />
    </>
  );
};
