"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/dashboard/common/ItemBase";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useProjectCategoryListItemPending } from "./useProjectCategoryListItemPending";

export type ProjectCategoryListItemActionMenuTriggerProps = {
  projectCategoryId: number;
};

export function ProjectCategoryListItemActionMenuTrigger({
  projectCategoryId,
}: ProjectCategoryListItemActionMenuTriggerProps) {
  const t = useTranslations(
    "dashboard.projectCategories.ProjectCategoryListItemActionMenuTrigger",
  );

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const { onOpenChange: onDeleteModalOpenChange } = useModal(
    "deleteProjectCategory",
  );

  // State for update project category modal from context
  const { onOpenChange: onUpdateModalOpenChange } = useModal(
    "updateProjectCategory",
  );

  /**
   * Handles menu actions for a project category item
   * - If user is a guest, show guest modal
   * - Otherwise, open edit or delete modal based on action key
   */
  const handleAction = (key: Key) => {
    guestGuard(() => {
      const action = key.toString();
      if (action === "edit") {
        onUpdateModalOpenChange(true);
      } else if (action === "delete") {
        onDeleteModalOpenChange(true);
      }
    });
  };

  // Determine if any action on this project category item is pending (update or delete)
  const isPending = useProjectCategoryListItemPending(projectCategoryId);

  return (
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
  );
}
