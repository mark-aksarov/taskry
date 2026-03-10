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
import { useCurrentUser } from "../../common/CurrentUserContext";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { EditProjectCategoryModal } from "../EditProjectCategoryModal";
import { useGuestModeModal } from "@/components/common/GuestModeModal";
import { DeleteProjectCategoryModal } from "../DeleteProjectCategoryModal";
import { useUpdateProjectCategory } from "../UpdateProjectCategoryContext";
import { useProjectCategoryListItemPending } from "./useProjectCategoryListItemPending";

export type ProjectCategoryListItemActionMenuTriggerProps = {
  projectCategoryId: number;
  projectCategoryName: string;
};

export function ProjectCategoryListItemActionMenuTrigger({
  projectCategoryId,
  projectCategoryName,
}: ProjectCategoryListItemActionMenuTriggerProps) {
  const t = useTranslations(
    "projectCategories.ProjectCategoryListItemActionMenuTrigger",
  );

  // Detect if the current user is a guest
  const { isGuest } = useCurrentUser();
  const { onOpenChange: onGuestModeModalOpenChange } = useGuestModeModal();

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State for edit modal from context
  const { onModalOpenChange: onEditModalOpenChange } =
    useUpdateProjectCategory();

  /**
   * Handles menu actions for a project category item
   * - If user is a guest, show guest modal
   * - Otherwise, open edit or delete modal based on action key
   */
  const handleAction = (key: Key) => {
    if (isGuest) {
      onGuestModeModalOpenChange(true);
      return;
    }

    const action = key.toString();
    if (action === "edit") {
      onEditModalOpenChange(true);
    } else if (action === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  // Determine if any action on this project category item is pending (update or delete)
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

      {/* Modals for editing, deleting, and guest mode */}
      <EditProjectCategoryModal
        projectCategoryId={projectCategoryId}
        projectCategoryName={projectCategoryName}
      />

      <DeleteProjectCategoryModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        projectCategoryId={projectCategoryId}
        projectCategoryName={projectCategoryName}
      />
    </>
  );
}
