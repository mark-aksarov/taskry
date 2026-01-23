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
import { DeleteCustomersModal } from "./DeleteCustomersModal";
import {
  ToolbarActionsButtonDesktop,
  ToolbarActionsButtonMobile,
  ToolbarActionsMenuTrigger,
} from "../common/Toolbar";
import { useCustomerSelection } from "@/lib/hooks/useCustomerSelection";
import { DialogHeader } from "../ui";

interface CustomerToolbarActionsMenuTriggerProps {
  deleteAction: ActionFn<ActionState, DeleteCustomersPayload>;
}

export const CustomerToolbarActionsMenuTrigger = ({
  deleteAction,
}: CustomerToolbarActionsMenuTriggerProps) => {
  const t = useTranslations("customers.CustomerToolbarActionsMenuTrigger");

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Menu actions: show delete modal
  const handleAction = (key: Key) => {
    if (key === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  const { selectedIds: customerIds, clearSelectedIds } = useCustomerSelection();

  const isDisabled = customerIds.length === 0;

  return (
    <>
      <ToolbarActionsMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => <DialogHeader>{t("actions")}</DialogHeader>}
        renderButton={() => (
          <>
            <ToolbarActionsButtonMobile isDisabled={isDisabled} />
            <ToolbarActionsButtonDesktop isDisabled={isDisabled} />
          </>
        )}
      >
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("delete")}
        </Item>
      </ToolbarActionsMenuTrigger>

      {/* Modal for confirming customer deletion */}
      <DeleteCustomersModal
        customerIds={customerIds}
        deleteAction={deleteAction}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onSuccess={clearSelectedIds}
      />
    </>
  );
};
