"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/components/common/ItemBase";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { EditProjectCategoryModal } from "./EditProjectCategoryModal";
import { useDeleteProjectCategoryModal } from "./DeleteProjectCategoryModal";

export type ProjectCategoryItemActionMenuTriggerProps = {
  guestMode: boolean;
  projectCategoryId: number;
  projectCategoryName: string;
  updateProjectCategory: ActionFn<ActionState, FormData>;
};

export function ProjectCategoryItemActionMenuTrigger({
  guestMode,
  projectCategoryId,
  projectCategoryName,
  updateProjectCategory,
}: ProjectCategoryItemActionMenuTriggerProps) {
  const t = useTranslations(
    "projectCategories.ProjectCategoryItemActionMenuTrigger",
  );

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the project category
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Modal state for deleting the project category
  const { setState: setDeleteCompanyModalState } =
    useDeleteProjectCategoryModal();

  // Handle menu actions
  const handleAction = (key: Key) => {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    const action = key.toString();
    if (action === "edit") {
      setIsEditModalOpen(true);
    } else if (action === "delete") {
      setDeleteCompanyModalState({
        isOpen: true,
        entityId: projectCategoryId,
        entityName: projectCategoryName,
      });
    }
  };

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <ItemBaseActionMenuButton
            data-test="project-category-item-action-menu-trigger"
            data-id={projectCategoryId}
          />
        )}
      >
        <Item textValue={t("edit")} key="edit">
          <Pencil size={16} /> {t("edit")}
        </Item>
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} /> {t("delete")}
        </Item>
      </ItemBaseActionMenuTrigger>

      <EditProjectCategoryModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        projectCategoryId={projectCategoryId}
        projectCategoryName={projectCategoryName}
        updateProjectCategory={updateProjectCategory}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
