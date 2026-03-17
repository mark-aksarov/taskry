"use client";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { DialogHeader } from "../ui/Dialog";
import { startTransition, useState } from "react";
import { ActionsButton } from "../common/ActionsButton";
import { ProjectStatus } from "@/generated/prisma/enums";
import { DeleteProjectsModal } from "./DeleteProjectsModal";
import { useGuestModeModal } from "../common/GuestModeModal";
import { useCurrentUser } from "../common/CurrentUserContext";
import { useSelectedProjects } from "./SelectedProjectsContext";
import { ActionsMenuTrigger } from "../common/ActionsMenuTrigger";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { useUpdateProjectStatuses } from "./UpdateProjectStatusesContext";

export const ProjectActionsMenuTrigger = () => {
  const t = useTranslations("projects.ProjectActionsMenuTrigger");

  // Detect if the current user is a guest
  const { isGuest } = useCurrentUser();
  const { onOpenChange: onGuestModeModalOpenChange } = useGuestModeModal();

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Action for updating project statuses
  const {
    action: updateProjectStatusesAction,
    setIds: setUpdateProjectStatusesIds,
  } = useUpdateProjectStatuses();

  // Selected with checkbox projects
  const selected = useSelectedProjects();

  /**
   * Handles menu actions for a selected projects
   * - If user is a guest, show guest modal
   * - Otherwise, open delete confirmation modal based on action key or update project statuses
   */
  const handleAction = (key: Key) => {
    if (isGuest) {
      onGuestModeModalOpenChange(true);
      return;
    }

    if (key === "delete") {
      setIsDeleteModalOpen(true);
    } else {
      // I store the current ids separately so that checkbox changes
      // during the update process don’t affect status tracking.
      setUpdateProjectStatusesIds(selected.ids);

      startTransition(() => {
        const nextStatus = key as ProjectStatus;

        updateProjectStatusesAction({
          ids: selected.ids,
          nextStatus,
        });
      });
    }
  };

  // disable menu items if selected projects have the same status.
  const disabledKeys = Object.values(ProjectStatus).filter((status) =>
    selected.items.every((project) => project.status === status),
  );

  return (
    <>
      <ActionsMenuTrigger
        onAction={handleAction}
        disabledKeys={disabledKeys}
        renderDialogHeader={() => (
          <DialogHeader>{t("dialogHeading")}</DialogHeader>
        )}
        renderButton={() => (
          <ActionsButton
            data-test="project-actions-menu-trigger"
            selectedIds={selected.ids}
          />
        )}
      >
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
      </ActionsMenuTrigger>

      {/* Modal for confirming project deletion */}
      <DeleteProjectsModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />
    </>
  );
};
