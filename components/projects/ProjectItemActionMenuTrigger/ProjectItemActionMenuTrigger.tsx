"use client";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
  UpdateProjectStatusesPayload,
} from "@/lib/actions/types";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "../../common/ItemBase";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { EditProjectModal } from "../EditProjectModal";
import { ProjectStatus } from "@/generated/prisma/enums";
import { DeleteProjectModal } from "../DeleteProjectModal";
import { GuestModeModal } from "../../common/GuestModeModal";
import { startTransition, useActionState, useState } from "react";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { Check, CircleEllipsis, Clock, Pencil, Trash } from "lucide-react";

export type ProjectItemActionMenuTriggerProps = {
  guestMode: boolean;
  projectId: number;
  projectTitle: string;
  projectStatus: ProjectStatus;
  className?: string;
  deleteAction: ActionFn<ActionState, DeleteProjectsPayload>;
  updateStatusAction: ActionFn<ActionState, UpdateProjectStatusesPayload>;
  editProjectFormContainer: React.ReactNode;
};

const updateStatusInitialState: ActionState = {
  status: null,
};

export function ProjectItemActionMenuTrigger({
  guestMode,
  projectId,
  projectTitle,
  projectStatus,
  className,
  deleteAction,
  updateStatusAction,
  editProjectFormContainer,
}: ProjectItemActionMenuTriggerProps) {
  const t = useTranslations("projects.ProjectItemActionMenuTrigger");

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the project
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  // Modal state for deleting the project
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  // State and action handler for updating project status
  const [
    updateProjectStatusState,
    updateProjectStatusAction,
    updateProjectStatusPending,
  ] = useActionState(updateStatusAction, updateStatusInitialState);

  // Show toast for status update errors
  useActionErrorToast(updateProjectStatusState, t("error.updateStatusError"));

  // Handle menu actions
  const handleAction = (key: Key) => {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    const action = key.toString();
    if (action === "edit") {
      setIsOpenEditModal(true);
    } else if (action === "delete") {
      setIsOpenDeleteModal(true);
    } else {
      startTransition(() => {
        updateProjectStatusAction({
          ids: [projectId],
          nextStatus: action as ProjectStatus,
        });
      });
    }
  };

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        disabledKeys={[projectStatus]}
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <ItemBaseActionMenuButton
            className={className}
            data-test="project-item-action-menu-trigger"
            data-id={projectId}
          />
        )}
      >
        <Item textValue={t("edit")} key="edit">
          <Pencil size={16} /> {t("edit")}
        </Item>
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

      {/* Modal for editing project details */}
      <EditProjectModal
        isOpen={isOpenEditModal}
        onOpenChange={setIsOpenEditModal}
        editProjectFormContainer={editProjectFormContainer}
      />

      {/* Modal for confirming project deletion */}
      <DeleteProjectModal
        projectId={projectId}
        projectTitle={projectTitle}
        isOpen={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
        deleteAction={deleteAction}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
