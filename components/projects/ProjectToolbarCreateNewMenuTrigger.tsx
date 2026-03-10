"use client";

import {
  ToolbarCreateNewModalTrigger,
  ToolbarCreateNewMenuTrigger,
} from "../common/Toolbar";

import { Key } from "react-aria";
import { Item } from "react-stately";
import { DialogHeader } from "../ui/Dialog";
import { useTranslations } from "next-intl";
import { Blocks, FolderClosed } from "lucide-react";
import { useCreateProject } from "./CreateProjectContext";
import { useGuestModeModal } from "../common/GuestModeModal";
import { useCurrentUser } from "../common/CurrentUserContext";
import { useCreateProjectCategory } from "../projectCategory/CreateProjectCategoryContext";

export function ProjectToolbarCreateNewMenuTrigger() {
  const t = useTranslations("projects.ProjectToolbarCreateNewMenuTrigger");

  // If the user is a guest, show the guest mode modal instead of allowing creation
  const { isGuest } = useCurrentUser();
  const { onOpenChange: onGuestModeModalOpenChange } = useGuestModeModal();

  // Create project category: action state + form modal state
  const {
    isPending: isCreateProjectCategoryPending,
    onModalOpenChange: onProjectCategoryModalOpenChange,
  } = useCreateProjectCategory();

  // Create project: action state + form modal state
  const {
    isPending: isCreateProjectPending,
    onModalOpenChange: onProjectModalOpenChange,
  } = useCreateProject();

  /**
   * Handles menu actions for creating a project or project category
   * - If user is a guest, show guest modal
   * - Otherwise, open create project category modal or create project modal
   */
  function handleAction(key: Key) {
    if (isGuest) {
      onGuestModeModalOpenChange(true);
      return;
    }

    if (key === "project") {
      onProjectModalOpenChange(true);
    } else if (key === "category") {
      onProjectCategoryModalOpenChange(true);
    }
  }

  return (
    <>
      <ToolbarCreateNewMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeader>{t("dialogHeading")}</DialogHeader>
        )}
        renderButton={() => (
          <ToolbarCreateNewModalTrigger
            data-test="project-toolbar-create-new-menu-trigger"
            label={t("label")}
            isDisabled={
              // Block user interactions while a project category or project is being created
              isCreateProjectCategoryPending || isCreateProjectPending
            }
          />
        )}
      >
        <Item textValue={t("items.project")} key="project">
          <FolderClosed size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.project")}
        </Item>
        <Item textValue={t("items.category")} key="category">
          <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.category")}
        </Item>
      </ToolbarCreateNewMenuTrigger>
    </>
  );
}
