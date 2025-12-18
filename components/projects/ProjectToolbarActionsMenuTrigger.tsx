"use client";

import { useMemo } from "react";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ToolbarActionsMenuTrigger } from "../common/Toolbar";
import { useProjectsSelection } from "./ProjectsSelectionContext";
import { useProjectActions } from "@/lib/hooks/useProjectActions";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { ActionFn, DeleteProjectState } from "@/lib/actions/types";
import { DeleteProjectModal } from "./DeleteProjectModal/DeleteProjectModal";
import { UpdateProjectStatusModal } from "./UpdateProjectStatusModal/UpdateProjectStatusModal";

interface ProjectToolbarActionsMenuTriggerProps {
  deleteAction: ActionFn<DeleteProjectState, number | number[]>;
}

export const ProjectToolbarActionsMenuTrigger = ({
  deleteAction,
}: ProjectToolbarActionsMenuTriggerProps) => {
  const t = useTranslations("projects.ProjectToolbarActionsMenuTrigger");

  const { selectedIds } = useProjectsSelection();

  const projectIds = useMemo(
    () =>
      Object.keys(selectedIds)
        .filter((id) => selectedIds[Number(id)])
        .map(Number),
    [selectedIds],
  );

  const {
    handleAction,
    deleteModal: { isOpen: isOpenDeleteModal, setIsOpen: setIsOpenDeleteModal },
    statusModal: {
      isOpen: isOpenUpdateStatusModal,
      setIsOpen: setIsOpenUpdateStatusModal,
      nextStatus,
      modalTextKey,
    },
    updateProjectStatusPending,
  } = useProjectActions({
    projectIds,
    projectStatus: "null",
    updateStatusAction: (...f: any): any => {},
  });

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

      <DeleteProjectModal
        projectIds={projectIds}
        isOpen={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
        deleteAction={deleteAction}
      />

      {/*
      <UpdateProjectStatusModal
        projectId={projectId}
        nextStatus={nextStatus!}
        modalTextKey={modalTextKey}
        isOpen={isOpenUpdateStatusModal}
        onOpenChange={setIsOpenUpdateStatusModal}
        updateStatusAction={updateStatusAction}
      />
*/}
    </>
  );
};
