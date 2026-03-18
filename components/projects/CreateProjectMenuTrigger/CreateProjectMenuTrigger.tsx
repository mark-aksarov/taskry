"use client";

import { Key } from "react-aria";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { Blocks, FolderClosed } from "lucide-react";
import { useCreateProject } from "../CreateProjectContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { CreateNewMenuTrigger } from "@/components/common/CreateNewMenuTrigger";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";
import { useCreateProjectCategory } from "@/components/projectCategory/CreateProjectCategoryContext";

interface CreateProjectMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function CreateProjectMenuTrigger({
  renderButton,
}: CreateProjectMenuTriggerProps) {
  const t = useTranslations("projects.CreateProjectMenuTrigger");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

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
    guestGuard(() => {
      if (key === "project") {
        onProjectModalOpenChange(true);
      } else if (key === "category") {
        onProjectCategoryModalOpenChange(true);
      }
    });
  }

  return (
    <>
      <CreateNewMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
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
