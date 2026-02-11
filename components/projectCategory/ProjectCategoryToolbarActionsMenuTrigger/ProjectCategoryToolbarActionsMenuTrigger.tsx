"use client";

import {
  ToolbarMenuTrigger,
  ToolbarActionsButtonMobile,
  ToolbarActionsButtonDesktop,
} from "../../common/Toolbar";

import { useState } from "react";
import { Trash } from "lucide-react";
import { Item, Key } from "react-stately";
import { DialogHeader } from "../../ui/Dialog";
import { useTranslations } from "next-intl";
import { GuestModeModal } from "../../common/GuestModeModal";
import { useProjectCategorySelection } from "@/lib/hooks/useProjectCategorySelection";

interface ProjectCategoryToolbarActionsMenuTriggerProps {
  guestMode: boolean;
}

export const ProjectCategoryToolbarActionsMenuTrigger = ({
  guestMode,
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
    selectedIds: projectIds,
    clearSelectedIds,
    selectedItems,
  } = useProjectCategorySelection();

  const isDisabled = projectIds.length === 0;

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

      {/* Guest mode modal */}
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
};
