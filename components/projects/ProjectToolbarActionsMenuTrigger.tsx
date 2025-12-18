"use client";

import {
  ActionFn,
  DeleteProjectsState,
  DeleteProjectsPayload,
  UpdateProjectStatusesState,
  UpdateProjectStatusesPayload,
} from "@/lib/actions/types";
import { useMemo, useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { ToolbarActionsMenuTrigger } from "../common/Toolbar";
import { useProjectsSelection } from "./ProjectsSelectionContext";
import { BulkDeleteProjectModal } from "./BulkDeleteProjectModal";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";

interface ProjectToolbarActionsMenuTriggerProps {
  deleteAction: ActionFn<DeleteProjectsState, DeleteProjectsPayload>;
  updateStatusAction: ActionFn<
    UpdateProjectStatusesState,
    UpdateProjectStatusesPayload
  >;
}

export const ProjectToolbarActionsMenuTrigger = ({
  deleteAction,
  updateStatusAction,
}: ProjectToolbarActionsMenuTriggerProps) => {
  const t = useTranslations("projects.ProjectToolbarActionsMenuTrigger");

  // Delete State
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

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

      <BulkDeleteProjectModal
        projectIds={projectIds}
        isOpen={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
        deleteAction={deleteAction}
      />
    </>
  );
};
