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
import { EditProjectCategoryModal } from "../EditProjectCategoryModal";
import { DeleteProjectCategoryModal } from "../DeleteProjectCategoryModal";

export type ProjectCategoryItemActionMenuTriggerProps = {
  guestMode: boolean;
  projectCategoryId: number;
  projectCategoryName: string;
  editProjectCategoryForm: React.ReactNode;
  deleteProjectCategories: ActionFn<ActionState, number[]>;
};

export function ProjectCategoryItemActionMenuTrigger({
  guestMode,
  projectCategoryId,
  projectCategoryName,
  editProjectCategoryForm,
  deleteProjectCategories,
}: ProjectCategoryItemActionMenuTriggerProps) {
  const t = useTranslations(
    "projectCategories.ProjectCategoryItemActionMenuTrigger",
  );

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the project category
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Modal state for deleting the project category
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

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
      setIsOpenDeleteModal(true);
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

      <DeleteProjectCategoryModal
        isOpen={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
        projectCategoryId={projectCategoryId}
        projectCategoryName={projectCategoryName}
        deleteProjectCategories={deleteProjectCategories}
      />

      <EditProjectCategoryModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        editProjectCategoryForm={editProjectCategoryForm}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
