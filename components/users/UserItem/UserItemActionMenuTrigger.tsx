"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/components/common/ItemBase";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { useUpdateUserModal } from "../UpdateUserModal";
import { useDeleteUserModal } from "../DeleteUserModal";
import { useUserItemPending } from "./useUserItemPending";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useCurrentUser } from "@/components/common/CurrentUserContext";

interface UserItemActionMenuTriggerProps {
  userId: string;
  className?: string;
}

export function UserItemActionMenuTrigger({
  userId,
  className,
}: UserItemActionMenuTriggerProps) {
  const t = useTranslations("users.UserItemActionMenuTrigger");

  // Detect if the current user is a guest
  const { userId: currentUserId } = useCurrentUser();

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const { onOpenChange: onDeleteModalOpenChange } = useDeleteUserModal();

  // State for update modal from context
  const { onOpenChange: onUpdateModalOpenChange } = useUpdateUserModal();

  /**
   * Handles menu actions for a user item
   * - If user is a guest, show guest modal
   * - Otherwise, open edit or delete modal based on action key
   */
  function handleAction(key: Key) {
    guestGuard(() => {
      if (key === "edit") {
        onUpdateModalOpenChange(true);
      } else if (key === "delete") {
        onDeleteModalOpenChange(true);
      }
    });
  }

  // The user can't delete themselves, so we need to make sure the user sees the "Delete" menu item.
  const showDeleteMenuItem = currentUserId !== userId;

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
        <Pencil size={16} /> {t("edit")}
      </Item>
      {showDeleteMenuItem ? (
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} /> {t("delete")}
        </Item>
      ) : null}
    </ItemBaseActionMenuTrigger>
  );
}
