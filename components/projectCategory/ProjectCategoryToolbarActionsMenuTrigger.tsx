"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { DialogHeader } from "../ui/Dialog";
import { GuestModeModal } from "../common/GuestModeModal";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ToolbarActionsMenuTrigger } from "../common/Toolbar";
import { useCurrentUser } from "../common/CurrentUserContext";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { DeleteProjectCategoriesModal } from "./DeleteProjectCategoriesModal";

interface ProjectCategoryToolbarActionsMenuTriggerProps {
  deleteProjectCategories: ActionFn<ActionState, number[]>;
}

export const ProjectCategoryToolbarActionsMenuTrigger = ({
  deleteProjectCategories,
}: ProjectCategoryToolbarActionsMenuTriggerProps) => {
  const t = useTranslations(
    "projectCategories.ProjectCategoryToolbarActionsMenuTrigger",
  );

  // Guest mode
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Selected with checkbox positions
  const selected = useSelectedItems();

  // Menu actions: show delete modal
  const handleAction = (key: Key) => {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  return (
    <>
      <ToolbarActionsMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeader>{t("dialogHeading")}</DialogHeader>
        )}
        selectedIds={selected.ids}
      >
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("delete")}
        </Item>
      </ToolbarActionsMenuTrigger>

      <DeleteProjectCategoriesModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        deleteProjectCategories={deleteProjectCategories}
        projectCategoryIds={selected.ids}
      />

      {/* Guest mode modal */}
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
};
