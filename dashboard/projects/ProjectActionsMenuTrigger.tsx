"use client";

import { startTransition } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { ActionsButton } from "../common/ActionsButton";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useModal } from "../common/ModalManagerContext";
import { useSelectedProjects } from "./SelectedProjectsContext";
import { ActionsMenuTrigger } from "../common/ActionsMenuTrigger";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";
import { useUpdateProjectStatuses } from "./UpdateProjectStatusesContext";

export const ProjectActionsMenuTrigger = () => {
  const t = useTranslations("dashboard.projects.ProjectActionsMenuTrigger");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteProjects");

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
    guestGuard(() => {
      if (key === "delete") {
        onDeleteModalOpenChange(true);
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
    });
  };

  // disable menu items if selected projects have the same status.
  const disabledKeys = Object.values(ProjectStatus).filter((status) =>
    selected.items.every((project) => project.status === status),
  );

  return (
    <ActionsMenuTrigger
      onAction={handleAction}
      disabledKeys={disabledKeys}
      renderDialogHeader={() => (
        <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
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
  );
};
