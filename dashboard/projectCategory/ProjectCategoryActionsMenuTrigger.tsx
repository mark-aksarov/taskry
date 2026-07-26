"use client";

import { Trash } from "lucide-react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { ActionsButton } from "../common/ActionsButton";
import { useModal } from "../../common/ModalManagerContext";
import { ActionsMenuTrigger } from "../common/ActionsMenuTrigger";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";
import { useSelectedItems } from "@/dashboard/common/SelectedItemsContext";

export const ProjectCategoryActionsMenuTrigger = () => {
  const t = useTranslations(
    "dashboard.projectCategories.ProjectCategoryActionsMenuTrigger",
  );

  // Delete confirmation modal state
  const { onOpenChange: onDeleteModalOpenChange } = useModal(
    "deleteProjectCategories",
  );

  // Selected with checkbox positions
  const selected = useSelectedItems();

  // Menu actions: show delete modal
  const handleAction = (key: Key) => {
    if (key === "delete") {
      onDeleteModalOpenChange(true);
    }
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
        <Trash />
        {t("delete")}
      </Item>
    </ActionsMenuTrigger>
  );
};
