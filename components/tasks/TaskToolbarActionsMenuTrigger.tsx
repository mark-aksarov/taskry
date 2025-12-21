"use client";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { ToolbarActionsMenuTrigger } from "../common/Toolbar";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { BulkDeleteEntityModal } from "../common/BulkDeleteEntityModal";
import { ActionFn, ActionState, DeleteTasksPayload } from "@/lib/actions/types";
import { useExtractCheckedItemIds } from "@/lib/hooks/useExtractCheckedItemIds";

interface TaskToolbarActionsMenuTriggerProps {
  deleteAction: ActionFn<ActionState, DeleteTasksPayload>;
}

interface DeleteModalState {
  taskIds: number[];
  isOpen: boolean;
}

export const TaskToolbarActionsMenuTrigger = ({
  deleteAction,
}: TaskToolbarActionsMenuTriggerProps) => {
  const t = useTranslations("tasks.TaskToolbarActionsMenuTrigger");
  const extractCheckedItemIds =
    useExtractCheckedItemIds<number>("task-checkbox-");

  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    taskIds: [],
    isOpen: false,
  });

  const handleAction = (key: Key) => {
    const ids = extractCheckedItemIds();

    if (key === "delete") {
      if (ids.length > 0) {
        setDeleteModal({
          taskIds: ids,
          isOpen: true,
        });
      }
    }
  };

  return (
    <>
      <ToolbarActionsMenuTrigger onAction={handleAction}>
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
        <Item textValue={t("completed")} key="done">
          <Clock size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("completed")}
        </Item>
      </ToolbarActionsMenuTrigger>

      <BulkDeleteEntityModal
        entityIds={deleteModal.taskIds}
        isOpen={deleteModal.isOpen}
        onOpenChange={(isOpen) =>
          setDeleteModal((prev) => ({ ...prev, isOpen }))
        }
        deleteAction={deleteAction}
        translationNamespace="tasks.BulkDeleteTaskModal"
      />
    </>
  );
};
