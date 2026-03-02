"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCurrentUser } from "../common/CurrentUserContext";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { ToolbarCreateNewModalTrigger } from "@/components/common/Toolbar";
import { useCreateProjectCategory } from "./CreateProjectCategoryContext";

export function ProjectCategoryToolbarCreateNewModalTrigger() {
  const t = useTranslations(
    "projectCategories.ProjectCategoryToolbarCreateNewModalTrigger",
  );

  // If the user is a guest, show the guest mode modal instead of allowing creation
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Create project category action and modal states
  const {
    isPending: isCreateProjectCategoryPending,
    isModalOpen: isCreateProjectCategoryModalOpen,
    onModalOpenChange: onProjectCategoryModalOpenChange,
  } = useCreateProjectCategory();

  /**
   * Handles menu actions for creating a project category
   * - If user is a guest, show guest modal
   * - Otherwise, open create project category modal
   */
  const handlePress = () => {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    onProjectCategoryModalOpenChange(true);
  };

  return (
    <>
      <ToolbarCreateNewModalTrigger
        data-test="project-category-toolbar-create-new-modal-trigger"
        label={t("label")}
        onPress={handlePress}
        // Block creating another project category until the current request completes
        // When the modal opens, a reset action is triggered, the pending state becomes true, and flickering occurs
        isDisabled={
          isCreateProjectCategoryPending && !isCreateProjectCategoryModalOpen
        }
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
