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
import { useCurrentUser } from "../../common/CurrentUserContext";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { EditProjectCategoryModal } from "../EditProjectCategoryModal";
import { DeleteProjectCategoryModal } from "../DeleteProjectCategoryModal";
import { useProjectCategoryListItemPending } from "./useProjectCategoryListItemPending";

export type ProjectCategoryListItemActionMenuTriggerProps = {
  projectCategoryId: number;
  projectCategoryName: string;
  updateProjectCategory: ActionFn<ActionState, FormData>;
  deleteProjectCategory: ActionFn<ActionState, number[]>;
};

export function ProjectCategoryListItemActionMenuTrigger({
  projectCategoryId,
  projectCategoryName,
  updateProjectCategory,
  deleteProjectCategory,
}: ProjectCategoryListItemActionMenuTriggerProps) {
  const t = useTranslations(
    "projectCategories.ProjectCategoryListItemActionMenuTrigger",
  );

  // Deleting the position
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Guest mode
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the project category
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Handle menu actions
  const handleAction = (key: Key) => {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    const action = key.toString();
    if (action === "edit") {
      setIsEditModalOpen(true);
    } else if (action === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  //Pending state while deleting or updating
  const isPending = useProjectCategoryListItemPending(projectCategoryId);

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <ItemBaseActionMenuButton
            isPending={isPending}
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

      <DeleteProjectCategoryModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        projectCategoryId={projectCategoryId}
        projectCategoryName={projectCategoryName}
        deleteProjectCategory={deleteProjectCategory}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
