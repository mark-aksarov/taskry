"use client";

import {
  ActionFn,
  DeleteProjectState,
  UpdateProjectStatusState,
} from "@/lib/actions/types";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ItemBaseActionMenuTrigger } from "../common/ItemBase";
import { useProjectActions } from "@/lib/hooks/useProjectActions";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { DeleteProjectModal } from "./DeleteProjectModal/DeleteProjectModal";
import { UpdateProjectStatusModal } from "./UpdateProjectStatusModal/UpdateProjectStatusModal";

export type ProjectItemActionMenuTriggerProps = {
  projectId: number;
  projectTitle: string;
  projectStatus: string;
  className?: string;
  deleteAction: ActionFn<DeleteProjectState>;
  updateStatusAction: ActionFn<UpdateProjectStatusState>;
};

export function ProjectItemActionMenuTrigger({
  projectId,
  projectTitle,
  projectStatus,
  className,
  deleteAction,
  updateStatusAction,
}: ProjectItemActionMenuTriggerProps) {
  const t = useTranslations("projects.ProjectItemActionMenuTrigger");

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
    projectIds: [projectId],
    projectStatus,
    updateStatusAction,
  });

  return (
    <>
      <ItemBaseActionMenuTrigger className={className} onAction={handleAction}>
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} /> {t("delete")}
        </Item>
        <Item textValue={t("markPending")} key="pending">
          <CircleEllipsis size={16} /> {t("markPending")}
        </Item>
        <Item textValue={t("markCompleted")} key="completed">
          <Check size={16} /> {t("markCompleted")}
        </Item>
        <Item textValue={t("markActive")} key="active">
          <Clock size={16} /> {t("markActive")}
        </Item>
      </ItemBaseActionMenuTrigger>

      <DeleteProjectModal
        projectIds={[projectId]}
        projectTitle={projectTitle}
        isOpen={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
        deleteAction={deleteAction}
      />

      <UpdateProjectStatusModal
        projectId={projectId}
        nextStatus={nextStatus!}
        modalTextKey={modalTextKey}
        isOpen={isOpenUpdateStatusModal}
        onOpenChange={setIsOpenUpdateStatusModal}
        updateStatusAction={updateStatusAction}
      />
    </>
  );
}
