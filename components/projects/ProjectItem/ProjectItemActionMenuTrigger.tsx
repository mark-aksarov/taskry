"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/components/common/ItemBase";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { startTransition, useState } from "react";
import { ProjectStatus } from "@/generated/prisma/enums";
import { DeleteProjectModal } from "../DeleteProjectModal";
import { useProjectItemPending } from "./useProjectItemPending";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useUpdateProjectStatus } from "../UpdateProjectStatusContext";
import { Trash, Check, Clock, Pencil, CircleEllipsis } from "lucide-react";
import { useUpdateProjectModal } from "../UpdateProjectModal";

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

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State for edit modal from context
  const { onOpenChange: onUpdateProjectModalOpenChange } =
    useUpdateProjectModal();

  // State for update project status from context
  const {
    isPending: isUpdateProjectStatusPending,
    action: updateProjectStatusAction,
  } = useUpdateProjectStatus();

  /**
   * Handles menu actions for a project item:
   * If the user is a guest, show the guest mode modal.
   * If action is "edit", open the edit modal.
   * If action is "delete", open the delete confirmation modal.
   * Otherwise, treat the action as a project status update
   *    and trigger the updateProjectStatusAction for this project.
   */
  const handleAction = (key: Key) => {
    guestGuard(() => {
      const action = key.toString();

      if (action === "edit") {
        onUpdateProjectModalOpenChange(true);
      } else if (action === "delete") {
        setIsDeleteModalOpen(true);
      } else {
        startTransition(() => {
          updateProjectStatusAction({
            id: projectId,
            nextStatus: action as ProjectStatus,
          });
        });
      }
    });
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
    </>
  );
}
