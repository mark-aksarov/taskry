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

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { startTransition, useState } from "react";
import { ProjectStatus } from "@/generated/prisma/enums";
import { DeleteProjectModal } from "../DeleteProjectModal";
import { useUpdateProject } from "../UpdateProjectContext";
import { GuestModeModal } from "../../common/GuestModeModal";
import { useProjectItemPending } from "./useProjectItemPending";
import { useUpdateProjectStatus } from "../UpdateProjectStatusContext";
import { useCurrentUser } from "@/components/common/CurrentUserContext";

export type ProjectItemActionMenuTriggerProps = {
  projectId: number;
  projectTitle: string;
  projectStatus: ProjectStatus;
  className?: string;
};

export function ProjectItemActionMenuTrigger({
  projectId,
  projectTitle,
  projectStatus,
  className,
}: ProjectItemActionMenuTriggerProps) {
  const t = useTranslations("projects.ProjectItemActionMenuTrigger");

  // Detect if the current user is a guest
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State for edit modal from context
  const { onModalOpenChange: onEditModalOpenChange } = useUpdateProject();

  // State for update project status from context
  const {
    isPending: isUpdateProjectStatusPending,
    action: updateProjectStatusAction,
  } = useUpdateProjectStatus();

  /**
   * Handles menu actions for a customer item:
   * 1. If the user is a guest, show the guest mode modal.
   * 2. If action is "details", do nothing.
   * 3. If action is "edit", open the edit modal.
   * 4. If action is "delete", open the delete confirmation modal.
   * 5. Otherwise, treat the action as a project status update
   *    and trigger the updateProjectStatusAction for this project.
   */
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
      onEditModalOpenChange(true);
    } else if (action === "delete") {
      setIsDeleteModalOpen(true);
    } else {
      startTransition(() => {
        updateProjectStatusAction({
          ids: [projectId],
          nextStatus: action as ProjectStatus,
        });
      });
    }
  };

  // Disable status-related menu items while a project update is in progress,
  // otherwise disable only the current project status.
  const disabledKeys = isUpdateProjectStatusPending
    ? ["pending", "active", "completed"]
    : [projectStatus];

  // Pending state while deleting or updating
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

      <DeleteProjectModal
        projectId={projectId}
        projectTitle={projectTitle}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
