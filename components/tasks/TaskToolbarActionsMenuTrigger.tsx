"use client";

import {
  ActionFn,
  ActionState,
  DeleteTasksPayload,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { TaskStatus } from "@/generated/prisma/enums";
import { GuestModeModal } from "../common/GuestModeModal";
import { ToolbarActionsMenuTrigger } from "../common/Toolbar";
import { useTaskSelection } from "@/lib/hooks/useTaskSelection";
import { startTransition, useActionState, useState } from "react";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { BulkDeleteEntityModal } from "../common/BulkDeleteEntityModal";
import { UpdateTaskStatusRestrictedModal } from "./UpdateTaskStatusRestrictedModal";
import { taskStatuses } from "@/lib/data/utils/statusUtils";

interface TaskToolbarActionsMenuTriggerProps {
  guestMode?: boolean;
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

export const TaskToolbarActionsMenuTrigger = ({
  guestMode,
  deleteAction,
  updateStatusAction,
}: TaskToolbarActionsMenuTriggerProps) => {
  const t = useTranslations("tasks.TaskToolbarActionsMenuTrigger");
  const {
    selectedIds: selectedTaskIds,
    clearSelectedIds,
    selectedItems,
  } = useTaskSelection();

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

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
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "delete") {
      setIsDeleteModalOpen(true);
      return;
    }

    const nextStatus = key as TaskStatus;

    startTransition(() => {
      updateTaskStatusAction({ ids: selectedTaskIds, nextStatus });
    });
  };

  useActionErrorToast(updateTaskStatusState);

  const disabledKeys = taskStatuses.filter((status) =>
    selectedItems.every((task) => task.status === status),
  );

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

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
};
