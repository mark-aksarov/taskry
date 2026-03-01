"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/components/common/ItemBase";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { EditUserModal } from "../EditUserModal";
import { Info, Pencil, Trash } from "lucide-react";
import { DeleteUserModal } from "../DeleteUserModal";
import { useUserItemPending } from "./useUserItemPending";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { ActionFn, ActionState, DeleteUserPayload } from "@/lib/actions/types";

interface UserItemActionMenuTriggerProps {
  userId: string;
  userFullName: string;
  className?: string;
  editUserFormContainer: React.ReactNode;
  deleteUser: ActionFn<ActionState, DeleteUserPayload>;
}

export function UserItemActionMenuTrigger({
  userId,
  userFullName,
  className,
  editUserFormContainer,
  deleteUser,
}: UserItemActionMenuTriggerProps) {
  const t = useTranslations("users.UserItemActionMenuTrigger");

  // Deleting the user
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Separate modal state for creating an user
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

  // Guest mode modal state
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  const { isGuest, userId: currentUserId } = useCurrentUser();

  // Menu actions: show guest modal, show edit user modal, show delete user modal
  function handleAction(key: Key) {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "details") {
      return;
    }

    if (key === "edit") {
      setIsEditUserModalOpen(true);
    } else if (key === "delete") {
      setIsDeleteModalOpen(true);
    }
  }

  // The user can't delete themselves, so we need to make sure the user sees the "Delete" menu item.
  const showDeleteMenuItem = currentUserId !== userId;

  //Pending state while deleting or updating
  const isPending = useUserItemPending();

  return (
    <>
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
        <Item href={`/team/${userId}`} textValue={t("details")} key="details">
          <Info size={16} /> {t("details")}
        </Item>
        <Item textValue={t("edit")} key="edit">
          <Pencil size={16} /> {t("edit")}
        </Item>
        {showDeleteMenuItem ? (
          <Item textValue={t("delete")} key="delete">
            <Trash size={16} /> {t("delete")}
          </Item>
        ) : null}
      </ItemBaseActionMenuTrigger>

      {/* Modal for editing task details */}
      <EditUserModal
        isOpen={isEditUserModalOpen}
        onOpenChange={setIsEditUserModalOpen}
        editUserFormContainer={editUserFormContainer}
      />

      <DeleteUserModal
        userId={userId}
        userFullName={userFullName}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        deleteUser={deleteUser}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
