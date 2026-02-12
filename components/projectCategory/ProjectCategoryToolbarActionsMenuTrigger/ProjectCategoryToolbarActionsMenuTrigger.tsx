"use client";

import {
  ToolbarMenuTrigger,
  ToolbarActionsButtonMobile,
  ToolbarActionsButtonDesktop,
} from "../../common/Toolbar";

import { useState } from "react";
import { Trash } from "lucide-react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { DialogHeader } from "../../ui/Dialog";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { GuestModeModal } from "../../common/GuestModeModal";
import { useProjectCategorySelection } from "@/lib/hooks/useProjectCategorySelection";
import { DeleteProjectCategoriesModal } from "../DeleteProjectCategoriesModal/DeleteProjectCategoriesModal";

interface ProjectCategoryToolbarActionsMenuTriggerProps {
  guestMode: boolean;
  deleteProjectCategories: ActionFn<ActionState, number[]>;
}

export const ProjectCategoryToolbarActionsMenuTrigger = ({
  guestMode,
  deleteProjectCategories,
}: ProjectCategoryToolbarActionsMenuTriggerProps) => {
  const t = useTranslations(
    "projectCategories.ProjectCategoryToolbarActionsMenuTrigger",
  );

  // Guest mode modal state
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Menu actions: show delete modal
  const handleAction = (key: Key) => {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  const {
    selectedIds: projectCategoryIds,
    clearSelectedIds,
    selectedItems,
  } = useProjectCategorySelection();

  const isDisabled = projectCategoryIds.length === 0;

  return (
    <>
      <ToolbarMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeader>{t("dialogHeading")}</DialogHeader>
        )}
        renderButton={() => (
          <>
            <ToolbarActionsButtonMobile
              data-test="project-category-toolbar-actions-button-mobile"
              isDisabled={isDisabled}
            />
            <ToolbarActionsButtonDesktop
              data-test="project-category-toolbar-actions-button-desktop"
              isDisabled={isDisabled}
            />
          </>
        )}
      >
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("delete")}
        </Item>
      </ToolbarMenuTrigger>

      <DeleteProjectCategoriesModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        deleteProjectCategories={deleteProjectCategories}
        projectCategoryIds={projectCategoryIds}
      />

      {/* Guest mode modal */}
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
};
