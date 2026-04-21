"use client";

import { Trash } from "lucide-react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { ActionsButton } from "../common/ActionsButton";
import { useModal } from "../common/ModalManagerContext";
import { ActionsMenuTrigger } from "../common/ActionsMenuTrigger";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";
import { useSelectedItems } from "@/dashboard/common/SelectedItemsContext";

export const ProjectCategoryActionsMenuTrigger = () => {
  const t = useTranslations(
    "dashboard.projectCategories.ProjectCategoryActionsMenuTrigger",
  );

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const { onOpenChange: onDeleteModalOpenChange } = useModal(
    "deleteProjectCategories",
  );

  // Selected with checkbox positions
  const selected = useSelectedItems();

  // Menu actions: show delete modal
  const handleAction = (key: Key) => {
    guestGuard(() => {
      if (key === "delete") {
        onDeleteModalOpenChange(true);
      }
    });
  };

  return (
    <ActionsMenuTrigger
      onAction={handleAction}
      renderDialogHeader={() => (
        <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
      )}
      renderButton={() => (
        <ActionsButton
          data-test="project-category-actions-menu-trigger"
          selectedIds={selected.ids}
        />
      )}
    >
      <Item textValue={t("delete")} key="delete">
        <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("delete")}
      </Item>
    </ActionsMenuTrigger>
  );
};
