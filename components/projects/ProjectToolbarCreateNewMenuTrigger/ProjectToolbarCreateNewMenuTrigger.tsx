"use client";

import {
  ToolbarCreateNewButton,
  ToolbarCreateNewMenuTrigger,
} from "../../common/Toolbar";

import { useState } from "react";
import { Key } from "react-aria";
import { Item } from "react-stately";
import { DialogHeader } from "../../ui/Dialog";
import { useTranslations } from "next-intl";
import { Blocks, FolderClosed } from "lucide-react";
import { GuestModeModal } from "../../common/GuestModeModal";
import { NewProjectModal } from "@/components/projects/NewProjectModal";
import { NewProjectCategoryModal } from "../../projectCategory/NewProjectCategoryModal";

interface ProjectToolbarCreateNewMenuTriggerProps {
  guestMode: boolean;
  newProjectFormContainer: React.ReactNode;
  newProjectCategoryForm: React.ReactNode;
}

export function ProjectToolbarCreateNewMenuTrigger({
  guestMode,
  newProjectFormContainer,
  newProjectCategoryForm,
}: ProjectToolbarCreateNewMenuTriggerProps) {
  const t = useTranslations("projects.ProjectToolbarCreateNewMenuTrigger");

  // Separate modal state for creating a project and a project category
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [openProjectCategoryModal, setOpenProjectCategoryModal] =
    useState(false);

  // Guest mode
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Open the corresponding modal based on the selected menu item
  function handleAction(key: Key) {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "project") {
      setOpenProjectModal(true);
    } else if (key === "category") {
      setOpenProjectCategoryModal(true);
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
          <ToolbarCreateNewButton
            data-test="project-toolbar-create-new-menu-trigger"
            label={t("label")}
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

      {/* Modal for creating a new project */}
      <NewProjectModal
        newProjectFormContainer={newProjectFormContainer}
        isOpen={openProjectModal}
        onOpenChange={setOpenProjectModal}
      />

      {/* Modal for creating a new project category */}
      <NewProjectCategoryModal
        newProjectCategoryForm={newProjectCategoryForm}
        isOpen={openProjectCategoryModal}
        onOpenChange={setOpenProjectCategoryModal}
      />

      {/* Guest mode modal */}
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
