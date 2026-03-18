"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { ActionsButton } from "../common/ActionsButton";
import { ActionsMenuTrigger } from "../common/ActionsMenuTrigger";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { DeleteTaskCategoriesModal } from "./DeleteTaskCategoriesModal";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

export const TaskCategoryActionsMenuTrigger = () => {
  const t = useTranslations("taskCategories.TaskCategoryActionsMenuTrigger");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Selected with checkbox positions
  const selected = useSelectedItems();

  // Menu actions: show delete modal
  const handleAction = (key: Key) => {
    guestGuard(() => {
      if (key === "delete") {
        setIsDeleteModalOpen(true);
      }
    });
  };

  return (
    <>
      <ActionsMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
        )}
        renderButton={() => (
          <ActionsButton
            data-test="task-category-actions-menu-trigger"
            selectedIds={selected.ids}
          />
        )}
      >
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("delete")}
        </Item>
      </ActionsMenuTrigger>

      <DeleteTaskCategoriesModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />
    </>
  );
};
