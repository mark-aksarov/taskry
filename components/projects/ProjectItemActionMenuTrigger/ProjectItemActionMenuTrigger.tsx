"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "../../common/ItemBase";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { startTransition, useState } from "react";
import { EditProjectModal } from "../EditProjectModal";
import { ProjectStatus } from "@/generated/prisma/enums";
import { GuestModeModal } from "../../common/GuestModeModal";
import { Check, CircleEllipsis, Clock, Pencil, Trash } from "lucide-react";
import { useUpdateProjectStatusContext } from "../UpdateProjectStatusContext";
import { useDeleteProjectModal } from "../DeleteProjectModal/DeleteProjectModalContext";

export type ProjectItemActionMenuTriggerProps = {
  guestMode: boolean;
  projectId: number;
  projectTitle: string;
  projectStatus: ProjectStatus;
  className?: string;
  editProjectFormContainer: React.ReactNode;
};

export function ProjectItemActionMenuTrigger({
  guestMode,
  projectId,
  projectTitle,
  projectStatus,
  className,
  editProjectFormContainer,
}: ProjectItemActionMenuTriggerProps) {
  const t = useTranslations("projects.ProjectItemActionMenuTrigger");

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the project
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  // Modal state for deleting the project
  const { setState } = useDeleteProjectModal();

  // State and action handler for updating project status
  const {
    action: updateProjectStatusAction,
    isPending: isUpdateProjectStatusPending,
  } = useUpdateProjectStatusContext();

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
      setState({
        isOpen: true,
        entityId: projectId,
        entityName: projectTitle,
      });
    } else {
      startTransition(() => {
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

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        disabledKeys={disabledKeys}
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

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
