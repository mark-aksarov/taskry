"use client";

import {
  ToolbarMenuTrigger,
  ToolbarActionsButtonMobile,
  ToolbarActionsButtonDesktop,
} from "../common/Toolbar";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { DialogHeader } from "../ui/Dialog";
import { startTransition, useState } from "react";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { GuestModeModal } from "../common/GuestModeModal";
import { DeleteProjectsModal } from "./DeleteProjectsModal";
import { useSelectedProjects } from "./SelectedProjectsContext";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { useUpdateProjectStatusesContext } from "./UpdateProjectStatusContext";

interface ProjectToolbarActionsMenuTriggerProps {
  guestMode: boolean;
  deleteProjects: ActionFn<ActionState, number[]>;
}

export const ProjectToolbarActionsMenuTrigger = ({
  guestMode,
  deleteProjects,
}: ProjectToolbarActionsMenuTriggerProps) => {
  const t = useTranslations("projects.ProjectToolbarActionsMenuTrigger");

  // Guest mode modal state
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Action for updating project status
  const { action: updateProjectStatusAction } =
    useUpdateProjectStatusesContext();

  // Selected with checkbox projects
  const selected = useSelectedProjects();

  // Menu actions: show delete modal, update project status
  const handleAction = (key: Key) => {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "delete") {
      setIsDeleteModalOpen(true);
    } else {
      startTransition(() => {
        const nextStatus = key as ProjectStatus;

        updateProjectStatusAction({
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

  // disable menu trigger if no projects are selected
  const isDisabled = selected.items.length === 0;

  return (
    <>
      <ToolbarMenuTrigger
        onAction={handleAction}
        disabledKeys={disabledKeys}
        renderDialogHeader={() => (
          <DialogHeader>{t("dialogHeading")}</DialogHeader>
        )}
        renderButton={() => (
          <>
            <ToolbarActionsButtonMobile
              data-test="project-toolbar-actions-button-mobile"
              isDisabled={isDisabled}
            />
            <ToolbarActionsButtonDesktop
              data-test="project-toolbar-actions-button-desktop"
              isDisabled={isDisabled}
            />
          </>
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
      </ToolbarMenuTrigger>

      {/* Modal for confirming project deletion */}
      <DeleteProjectsModal
        projectIds={selected.ids}
        deleteProjects={deleteProjects}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />

      {/* Guest mode modal */}
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
};
