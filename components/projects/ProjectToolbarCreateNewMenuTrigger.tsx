"use client";

import {
  ToolbarCreateNewButton,
  ToolbarCreateNewMenuTrigger,
} from "../common/Toolbar";

import { useState } from "react";
import { Key } from "react-aria";
import { Item } from "react-stately";
import { DialogHeader } from "../ui";
import { useTranslations } from "next-intl";
import { Blocks, FolderClosed } from "lucide-react";
import { NewProjectCategoryModal } from "./NewProjectCategoryModal";
import { NewProjectModal } from "@/components/projects/NewProjectModal";

interface ProjectToolbarCreateNewMenuTriggerProps {
  newProjectFormContainer: React.ReactNode;
  newProjectCategoryForm: React.ReactNode;
}

export function ProjectToolbarCreateNewMenuTrigger({
  newProjectFormContainer,
  newProjectCategoryForm,
}: ProjectToolbarCreateNewMenuTriggerProps) {
  const t = useTranslations("projects.ProjectToolbarCreateNewMenuTrigger");

  // Separate modal state for creating a project and a project category
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [openProjectCategoryModal, setOpenProjectCategoryModal] =
    useState(false);

  // Open the corresponding modal based on the selected menu item
  function handleAction(key: Key) {
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
    </>
  );
}
