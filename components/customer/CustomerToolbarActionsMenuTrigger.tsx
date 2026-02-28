"use client";

import {
  ActionFn,
  ActionState,
  DeleteCustomersPayload,
} from "@/lib/actions/types";

import { useState } from "react";
import { Trash } from "lucide-react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { DialogHeader } from "../ui/Dialog";
import { ToolbarActionsMenuTrigger } from "../common/Toolbar";
import { DeleteCustomersModal } from "./DeleteCustomersModal";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface CustomerToolbarActionsMenuTriggerProps {
  deleteCustomers: ActionFn<ActionState, DeleteCustomersPayload>;
}

export const CustomerToolbarActionsMenuTrigger = ({
  deleteCustomers,
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

  return (
    <>
      <ToolbarActionsMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeader>{t("dialogHeading")}</DialogHeader>
        )}
        selectedIds={selected.ids}
      >
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("delete")}
        </Item>
      </ToolbarActionsMenuTrigger>

      {/* Modal for confirming customer deletion */}
      <DeleteCustomersModal
        customerIds={selected.ids}
        deleteCustomers={deleteCustomers}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />
    </>
  );
};
