"use client";

import {
  Info,
  Trash,
  Check,
  Clock,
  Pencil,
  CircleEllipsis,
} from "lucide-react";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "../../common/ItemBase";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
  UpdateProjectStatusesPayload,
} from "@/lib/actions/types";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { EditProjectModal } from "../EditProjectModal";
import { ProjectStatus } from "@/generated/prisma/enums";
import { DeleteProjectModal } from "../DeleteProjectModal";
import { GuestModeModal } from "../../common/GuestModeModal";
import { useProjectItemPending } from "./useProjectItemPending";
import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { useUpdateEntityStatusActionState } from "@/lib/hooks/useUpdateEntityStatusActionState";
import { useUpdateProjectStatusTransition } from "../UpdateProjectStatusTransitionContext";

export type ProjectItemActionMenuTriggerProps = {
  projectId: number;
  projectTitle: string;
  projectStatus: ProjectStatus;
  className?: string;
  editProjectFormContainer: React.ReactNode;
  deleteProject: ActionFn<ActionState, DeleteProjectsPayload>;
  updateProjectStatus: ActionFn<ActionState, UpdateProjectStatusesPayload>;
};

export function ProjectItemActionMenuTrigger({
  projectId,
  projectTitle,
  projectStatus,
  className,
  editProjectFormContainer,
  deleteProject,
  updateProjectStatus,
}: ProjectItemActionMenuTriggerProps) {
  const t = useTranslations("projects.ProjectItemActionMenuTrigger");

  // Deleting the customer
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Guest mode
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the project
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  // updating project status
  const [, updateProjectStatusAction] = useUpdateEntityStatusActionState({
    updateEntityStatus: updateProjectStatus,
  });
  const {
    isPending: isUpdateProjectStatusPending,
    startTransition: startUpdateProjectStatusTransition,
  } = useUpdateProjectStatusTransition();

  // Handle menu actions
  const handleAction = (key: Key) => {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    const action = key.toString();

    if (action === "details") {
      return;
    }

    if (action === "edit") {
      setIsOpenEditModal(true);
    } else if (action === "delete") {
      setIsDeleteModalOpen(true);
    } else {
      startUpdateProjectStatusTransition(() => {
        updateProjectStatusAction({
          ids: [projectId],
          nextStatus: action as ProjectStatus,
        });
      });
    }
  };

  const disabledKeys = isUpdateProjectStatusPending
    ? ["pending", "active", "completed"]
    : [projectStatus];

  //Pending state while deleting or updating
  const isPending = useProjectItemPending(projectId);

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        disabledKeys={disabledKeys}
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <ItemBaseActionMenuButton
            className={className}
            isPending={isPending}
            data-test="project-item-action-menu-trigger"
            data-id={projectId}
          />
        )}
      >
        <Item
          href={`/projects/${projectId}`}
          textValue={t("details")}
          key="details"
        >
          <Info size={16} /> {t("details")}
        </Item>
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

      <DeleteProjectModal
        projectId={projectId}
        projectTitle={projectTitle}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        deleteProject={deleteProject}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
