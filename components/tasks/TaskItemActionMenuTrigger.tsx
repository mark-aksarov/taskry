"use client";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
} from "@/lib/actions/types";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { ItemBaseActionMenuTrigger } from "../common/ItemBase";
import { DeleteEntityModal } from "../common/DeleteEntityModal";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";

export type TaskItemActionMenuTriggerProps = {
  taskId: number;
  taskTitle: string;
  className?: string;
  deleteAction: ActionFn<ActionState, DeleteProjectsPayload>;
};

export function TaskItemActionMenuTrigger({
  taskId,
  taskTitle,
  className,
  deleteAction,
}: TaskItemActionMenuTriggerProps) {
  const t = useTranslations("tasks.TaskItemActionMenuTrigger");

  // Delete State
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  function handleAction(key: Key) {
    const action = key.toString();

    if (action === "delete") {
      setIsOpenDeleteModal(true);
    }
  }

  return (
    <>
      <ItemBaseActionMenuTrigger className={className} onAction={handleAction}>
        <Item textValue={t("edit")} key="edit">
          <Trash size={16} /> {t("edit")}
        </Item>
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} /> {t("delete")}
        </Item>
        <Item textValue={t("markPending")} key="pending">
          <CircleEllipsis size={16} /> {t("markPending")}
        </Item>
        <Item textValue={t("markCompleted")} key="done">
          <Check size={16} /> {t("markCompleted")}
        </Item>
        <Item textValue={t("markActive")} key="active">
          <Clock size={16} /> {t("markActive")}
        </Item>
      </ItemBaseActionMenuTrigger>

      <DeleteEntityModal
        entityId={taskId}
        entityName={taskTitle}
        translationNamespace="tasks.DeleteTaskModal"
        isOpen={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
        deleteAction={deleteAction}
      />
    </>
  );
}
