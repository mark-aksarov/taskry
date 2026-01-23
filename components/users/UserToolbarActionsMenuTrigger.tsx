"use client";

import {
  ToolbarActionsMenuTrigger,
  ToolbarActionsButtonMobile,
  ToolbarActionsButtonDesktop,
} from "../common/Toolbar";

import { useState } from "react";
import { DialogHeader } from "../ui";
import { Trash } from "lucide-react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { DeleteUsersModal } from "./DeleteUsersModal";
import { useUserSelection } from "@/lib/hooks/useUserSelection";
import { ActionFn, ActionState, DeleteUsersPayload } from "@/lib/actions/types";

export const UserToolbarActionsMenuTrigger = ({
  deleteAction,
}: {
  deleteAction: ActionFn<ActionState, DeleteUsersPayload>;
}) => {
  const t = useTranslations("users.UserToolbarActionsMenuTrigger");

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Menu actions: show delete modal
  const handleAction = (key: Key) => {
    if (key === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  const { selectedIds: userIds, clearSelectedIds } = useUserSelection();

  const isDisabled = userIds.length === 0;

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

      {/* Modal for confirming user deletion */}
      <DeleteUsersModal
        userIds={userIds}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        deleteAction={deleteAction}
        onSuccess={clearSelectedIds}
      />
    </>
  );
};
