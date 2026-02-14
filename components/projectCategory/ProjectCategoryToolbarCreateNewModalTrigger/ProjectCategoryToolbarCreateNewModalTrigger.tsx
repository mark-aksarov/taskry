"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { ToolbarCreateNewModalTrigger } from "@/components/common/Toolbar";
import { NewProjectCategoryModal } from "../NewProjectCategoryModal";

interface ProjectCategoryToolbarCreateNewModalTriggerProps {
  guestMode: boolean;
  newProjectCategoryForm: React.ReactNode;
}

export function ProjectCategoryToolbarCreateNewModalTrigger({
  guestMode,
  newProjectCategoryForm,
}: ProjectCategoryToolbarCreateNewModalTriggerProps) {
  const t = useTranslations(
    "projectCategories.ProjectCategoryToolbarCreateNewModalTrigger",
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
      <ToolbarCreateNewModalTrigger
        data-test="project-category-toolbar-create-new-modal-trigger"
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
