"use client";

import { Key } from "react-aria";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { Blocks, FolderClosed } from "lucide-react";
import { DialogHeader } from "@/components/ui/Dialog";
import { useCreateProject } from "../CreateProjectContext";
import { useGuestModeModal } from "@/components/common/GuestModeModal";
import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { CreateNewMenuTrigger } from "@/components/common/CreateNewMenuTrigger";
import { useCreateProjectCategory } from "@/components/projectCategory/CreateProjectCategoryContext";

interface CreateProjectMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function CreateProjectMenuTrigger({
  renderButton,
}: CreateProjectMenuTriggerProps) {
  const t = useTranslations("projects.CreateProjectMenuTrigger");

  // If the user is a guest, show the guest mode modal instead of allowing creation
  const { isGuest } = useCurrentUser();
  const { onOpenChange: onGuestModeModalOpenChange } = useGuestModeModal();

  // Create project category form modal state
  const { onModalOpenChange: onProjectCategoryModalOpenChange } =
    useCreateProjectCategory();

  // Create project form modal state
  const { onModalOpenChange: onProjectModalOpenChange } = useCreateProject();

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
      <CreateNewMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeader>{t("dialogHeading")}</DialogHeader>
        )}
        renderButton={renderButton}
      >
        <Item textValue={t("items.project")} key="project">
          <FolderClosed size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.project")}
        </Item>
        <Item textValue={t("items.category")} key="category">
          <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.category")}
        </Item>
      </CreateNewMenuTrigger>
    </>
  );
}
