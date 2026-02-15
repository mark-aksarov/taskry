"use client";

import {
  ActionFn,
  ActionState,
  DeleteCustomersPayload,
} from "@/lib/actions/types";

import {
  ToolbarMenuTrigger,
  ToolbarActionsButtonMobile,
  ToolbarActionsButtonDesktop,
} from "../../common/Toolbar";

import { useState } from "react";
import { Trash } from "lucide-react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { DialogHeader } from "../../ui/Dialog";
import { DeleteCustomersModal } from "../DeleteCustomersModal";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface CustomerToolbarActionsMenuTriggerProps {
  deleteAction: ActionFn<ActionState, DeleteCustomersPayload>;
}

export const CustomerToolbarActionsMenuTrigger = ({
  deleteAction,
}: CustomerToolbarActionsMenuTriggerProps) => {
  const t = useTranslations("customers.CustomerToolbarActionsMenuTrigger");

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Selected with checkbox customers
  const selected = useSelectedItems();

  // Menu actions: show delete modal
  const handleAction = (key: Key) => {
    if (key === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  const isDisabled = selected.ids.length === 0;

  return (
    <>
      <ToolbarMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeader>{t("dialogHeading")}</DialogHeader>
        )}
        renderButton={() => (
          <>
            <ToolbarActionsButtonMobile
              data-test="customer-toolbar-actions-button-mobile"
              isDisabled={isDisabled}
            />
            <ToolbarActionsButtonDesktop
              data-test="customer-toolbar-actions-button-desktop"
              isDisabled={isDisabled}
            />
          </>
        )}
      >
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("delete")}
        </Item>
      </ToolbarMenuTrigger>

      {/* Modal for confirming customer deletion */}
      <DeleteCustomersModal
        customerIds={selected.ids}
        deleteAction={deleteAction}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onSuccess={selected.clear}
      />
    </>
  );
};
