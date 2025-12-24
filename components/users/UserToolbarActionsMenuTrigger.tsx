"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { ToolbarActionsMenuTrigger } from "../common/Toolbar";
import { useUserSelection } from "@/lib/hooks/useUserSelection";
import { BulkDeleteEntityModal } from "../common/BulkDeleteEntityModal";
import { ActionFn, ActionState, DeleteUsersPayload } from "@/lib/actions/types";

export const UserToolbarActionsMenuTrigger = ({
  deleteAction,
}: {
  deleteAction: ActionFn<ActionState, DeleteUsersPayload>;
}) => {
  const t = useTranslations("users.UserToolbarActionsMenuTrigger");

  const { selectedIds: projectIds, clearSelectedIds } = useUserSelection();

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
        translationNamespace="users.BulkDeleteUserModal"
        deleteAction={deleteAction}
        onSuccess={clearSelectedIds}
      />
    </>
  );
};
