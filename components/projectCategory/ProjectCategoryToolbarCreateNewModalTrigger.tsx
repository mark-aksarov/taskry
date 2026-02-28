"use client";

import { useContext, useState } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useCurrentUser } from "../common/CurrentUserContext";
import { NewProjectCategoryModal } from "./NewProjectCategoryModal";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { ToolbarCreateNewModalTrigger } from "@/components/common/Toolbar";

interface ProjectCategoryToolbarCreateNewModalTriggerProps {
  createProjectCategory: ActionFn<ActionState, FormData>;
}

export function ProjectCategoryToolbarCreateNewModalTrigger({
  createProjectCategory,
}: ProjectCategoryToolbarCreateNewModalTriggerProps) {
  const t = useTranslations(
    "projectCategories.ProjectCategoryToolbarCreateNewModalTrigger",
  );

  // Create new project category modal
  const [isProjectCategoryModalOpen, setIsProjectCategoryModalOpen] =
    useState(false);

  // Guest mode
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  const handlePress = () => {
    if (isGuest) {
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
        createProjectCategory={createProjectCategory}
      />
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
