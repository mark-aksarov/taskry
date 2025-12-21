"use client";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
  UpdateProjectStatusesPayload,
} from "@/lib/actions/types";

import { useMemo, useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { ToolbarActionsMenuTrigger } from "../common/Toolbar";
import { useProjectsSelection } from "./ProjectsSelectionContext";
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

  // Delete State
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  // Update Status
  const [updateModal, setUpdateModal] = useState<UpdateStatusModalState>({
    isOpen: false,
    nextStatus: "complete",
  });

  const { selectedIds } = useProjectsSelection();

  const projectIds = useMemo(
    () =>
      Object.keys(selectedIds)
        .filter((id) => selectedIds[Number(id)])
        .map(Number),
    [selectedIds],
  );

  const handleAction = (key: Key) => {
    if (key === "delete") {
      setIsOpenDeleteModal(true);
    } else {
      setUpdateModal({ isOpen: true, nextStatus: key.toString() });
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
        <Item textValue={t("completed")} key="completed">
          <Clock size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("completed")}
        </Item>
      </ToolbarActionsMenuTrigger>

      <BulkDeleteEntityModal
        entityIds={projectIds}
        isOpen={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
        translationNamespace="projects.BulkDeleteProjectModal"
        deleteAction={deleteAction}
      />

      <BulkUpdateProjectStatusModal
        projectIds={projectIds}
        {...updateModal}
        onOpenChange={(open) =>
          setUpdateModal((prev) => ({ ...prev, isOpen: open }))
        }
        updateStatusAction={updateStatusAction}
      />
    </>
  );
};
