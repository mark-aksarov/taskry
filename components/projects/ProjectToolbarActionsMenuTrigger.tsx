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
import { BulkUpdateProjectStatusModal } from "./BulkUpdateProjectStatusModal";

interface ProjectToolbarActionsMenuTriggerProps {
  deleteAction: ActionFn<DeleteProjectsState, DeleteProjectsPayload>;
  updateStatusAction: ActionFn<
    UpdateProjectStatusesState,
    UpdateProjectStatusesPayload
  >;
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

      <BulkDeleteProjectModal
        projectIds={projectIds}
        isOpen={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
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
