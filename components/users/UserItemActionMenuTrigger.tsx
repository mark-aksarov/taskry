"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "../common/ItemBase";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { EditUserModal } from "./EditUserModal";
import { Info, Pencil, Trash } from "lucide-react";
import { DeleteUserModal } from "./DeleteUserModal";
import { GuestModeModal } from "../common/GuestModeModal";
import { useDeleteUserContext } from "./DeleteUserContext";
import { useCurrentUser } from "../common/CurrentUserContext";

interface UserItemActionMenuTriggerProps {
  userId: string;
  userFullName: string;
  className?: string;
  editUserFormContainer: React.ReactNode;
}

export function UserItemActionMenuTrigger({
  userId,
  userFullName,
  className,
  editUserFormContainer,
}: UserItemActionMenuTriggerProps) {
  const t = useTranslations("users.UserItemActionMenuTrigger");

  // Deleting the user
  const { isPending: isDeletePending } = useDeleteUserContext();
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

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <ItemBaseActionMenuButton
            className={className}
            isPending={isDeletePending}
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
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
