"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { ToolbarCreateNewButton } from "@/components/common/Toolbar";
import { NewProjectCategoryModal } from "../NewProjectCategoryModal";

interface ProjectCategoryToolbarCreateNewButtonProps {
  guestMode: boolean;
  newProjectCategoryForm: React.ReactNode;
}

export function ProjectCategoryToolbarCreateNewButton({
  guestMode,
  newProjectCategoryForm,
}: ProjectCategoryToolbarCreateNewButtonProps) {
  const t = useTranslations(
    "projectCategories.ProjectCategoryToolbarCreateNewButton",
  );

  // Create new project category modal
  const [isProjectCategoryModalOpen, setIsProjectCategoryModalOpen] =
    useState(false);

  // Guest mode
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  const handlePress = () => {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    setIsProjectCategoryModalOpen(true);
  };

  return (
    <>
      <ToolbarCreateNewButton
        data-test="project-category-toolbar-create-new-button"
        label={t("label")}
        onPress={handlePress}
      />
      <NewProjectCategoryModal
        isOpen={isProjectCategoryModalOpen}
        onOpenChange={setIsProjectCategoryModalOpen}
        newProjectCategoryForm={newProjectCategoryForm}
      />
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
