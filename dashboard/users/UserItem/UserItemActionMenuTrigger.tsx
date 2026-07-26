"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/dashboard/common/ItemBase";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { useModal } from "@/common/ModalManagerContext";
import { useUserItemPending } from "./useUserItemPending";
import { useSession } from "@/common/SessionContext";

interface UserItemActionMenuTriggerProps {
  userId: string;
  className?: string;
}

export function UserItemActionMenuTrigger({
  userId,
  className,
}: UserItemActionMenuTriggerProps) {
  const t = useTranslations("dashboard.users.UserItemActionMenuTrigger");

  // Detect if the current user is a
  const session = useSession();

  const sessionUserId = session?.user.id;

  // Delete confirmation modal state
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteUser");

  // State for update modal from context
  const { onOpenChange: onUpdateModalOpenChange } = useModal("updateUser");

  /**
   * Open edit or delete modal based on action key
   */
  function handleAction(key: Key) {
    if (key === "edit") {
      onUpdateModalOpenChange(true);
    } else if (key === "delete") {
      onDeleteModalOpenChange(true);
    }
  }

  // The user can't delete themselves, so we need to make sure the user sees the "Delete" menu item.
  const showDeleteMenuItem = sessionUserId !== userId;

  //Pending state while deleting or updating
  const isPending = useUserItemPending();

  return (
    <ItemBaseActionMenuTrigger
      onAction={handleAction}
      renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
      renderButton={() => (
        <ItemBaseActionMenuButton
          className={className}
          isPending={isPending}
          data-test="user-item-action-menu-trigger"
          data-id={userId}
        />
      )}
    >
      <Item textValue={t("edit")} key="edit">
        <Pencil /> {t("edit")}
      </Item>
      {showDeleteMenuItem ? (
        <Item textValue={t("delete")} key="delete">
          <Trash /> {t("delete")}
        </Item>
      ) : null}
    </ItemBaseActionMenuTrigger>
  );
}
