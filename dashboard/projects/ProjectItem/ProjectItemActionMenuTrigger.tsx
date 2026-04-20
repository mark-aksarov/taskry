"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/dashboard/common/ItemBase";

import { startTransition } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useProjectItemPending } from "./useProjectItemPending";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useUpdateProjectStatus } from "../UpdateProjectStatusContext";
import { Trash, Check, Clock, Pencil, CircleEllipsis } from "lucide-react";

export type ProjectItemActionMenuTriggerProps = {
  projectId: number;
  projectStatus: ProjectStatus;
  className?: string;
};

export function ProjectItemActionMenuTrigger({
  projectId,
  projectStatus,
  className,
}: ProjectItemActionMenuTriggerProps) {
  const t = useTranslations("dashboard.projects.ProjectItemActionMenuTrigger");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteProject");

  // State for edit modal from context
  const { onOpenChange: onUpdateModalOpenChange } = useModal("updateProject");

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
        onUpdateModalOpenChange(true);
      } else if (action === "delete") {
        onDeleteModalOpenChange(true);
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
  );
}
