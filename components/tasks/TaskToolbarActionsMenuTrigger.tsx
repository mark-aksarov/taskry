"use client";

import { useMemo, useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { ToolbarActionsMenuTrigger } from "../common/Toolbar";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { BulkDeleteEntityModal } from "../common/BulkDeleteEntityModal";
import { ActionFn, ActionState, DeleteTasksPayload } from "@/lib/actions/types";
import { useTasksSelection } from "./TasksSelectionContext/TasksSelectionContext";

interface TaskToolbarActionsMenuTriggerProps {
  deleteAction: ActionFn<ActionState, DeleteTasksPayload>;
}

export const TaskToolbarActionsMenuTrigger = ({
  deleteAction,
}: TaskToolbarActionsMenuTriggerProps) => {
  const t = useTranslations("tasks.TaskToolbarActionsMenuTrigger");

  // Delete State
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const { selectedIds } = useTasksSelection();

  const taskIds = useMemo(
    () =>
      Object.keys(selectedIds)
        .filter((id) => selectedIds[Number(id)])
        .map(Number),
    [selectedIds],
  );

  const handleAction = (key: Key) => {
    if (key === "delete") {
      setIsOpenDeleteModal(true);
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
        entityIds={taskIds}
        isOpen={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
        deleteAction={deleteAction}
        translationNamespace="tasks.BulkDeleteTaskModal"
      />
    </>
  );
};
