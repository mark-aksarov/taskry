"use client";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
  UpdateProjectStatusesPayload,
} from "@/lib/actions/types";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { ToolbarActionsMenuTrigger } from "../common/Toolbar";
import { useTaskSelection } from "@/lib/hooks/useTaskSelection";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { BulkDeleteEntityModal } from "../common/BulkDeleteEntityModal";
import { BulkUpdateProjectStatusModal } from "./BulkUpdateProjectStatusModal";

interface ProjectToolbarActionsMenuTriggerProps {
  deleteAction: ActionFn<ActionState, DeleteProjectsPayload>;
  updateStatusAction: ActionFn<ActionState, UpdateProjectStatusesPayload>;
}

interface UpdateStatusModalState {
  isOpen: boolean;
  nextStatus: string;
}

export const ProjectToolbarActionsMenuTrigger = ({
  deleteAction,
  updateStatusAction,
}: ProjectToolbarActionsMenuTriggerProps) => {
  const t = useTranslations("projects.ProjectToolbarActionsMenuTrigger");
  const { selectedIds: projectIds, clearIds } = useTaskSelection();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [updateModal, setUpdateModal] = useState<UpdateStatusModalState>({
    isOpen: false,
    nextStatus: "complete",
  });

  const handleAction = (key: Key) => {
    if (key === "delete") {
      setIsDeleteModalOpen(true);
    } else {
      setUpdateModal({
        isOpen: true,
        nextStatus: key.toString(),
      });
    }
  };

  return (
    <>
      <ToolbarActionsMenuTrigger
        onAction={handleAction}
        isDisabled={projectIds.length === 0}
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
        entityIds={projectIds}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        translationNamespace="projects.BulkDeleteProjectModal"
        deleteAction={deleteAction}
        onSuccess={clearIds}
      />

      <BulkUpdateProjectStatusModal
        projectIds={projectIds}
        nextStatus={updateModal.nextStatus}
        isOpen={updateModal.isOpen}
        onOpenChange={(open) =>
          setUpdateModal((prev) => ({ ...prev, isOpen: open }))
        }
        updateStatusAction={updateStatusAction}
      />
    </>
  );
};
