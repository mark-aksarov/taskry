"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { ToolbarActionsMenuTrigger } from "../common/Toolbar";
import { useCustomerSelection } from "@/lib/hooks/useCustomerSelection";
import { BulkDeleteEntityModal } from "../common/BulkDeleteEntityModal";
import {
  ActionFn,
  ActionState,
  DeleteCustomersPayload,
} from "@/lib/actions/types";

interface CustomerToolbarActionsMenuTriggerProps {
  deleteAction: ActionFn<ActionState, DeleteCustomersPayload>;
}

export const CustomerToolbarActionsMenuTrigger = ({
  deleteAction,
}: CustomerToolbarActionsMenuTriggerProps) => {
  const t = useTranslations("customers.CustomerToolbarActionsMenuTrigger");

  const { selectedIds: projectIds, clearSelectedIds } = useCustomerSelection();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleAction = (key: Key) => {
    if (key === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  return (
    <>
      <ToolbarActionsMenuTrigger onAction={handleAction}>
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("delete")}
        </Item>
      </ToolbarActionsMenuTrigger>

      <BulkDeleteEntityModal
        entityIds={projectIds}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        translationNamespace="customers.BulkDeleteCustomerModal"
        deleteAction={deleteAction}
        onSuccess={clearSelectedIds}
      />
    </>
  );
};
