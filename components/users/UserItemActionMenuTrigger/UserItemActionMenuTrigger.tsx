"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "../../common/ItemBase";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { EditUserModal } from "../EditUserModal";
import { useDeleteUserModal } from "../DeleteUserModal";
import { GuestModeModal } from "../../common/GuestModeModal";

interface UserItemActionMenuTriggerProps {
  showDeleteMenuItem: boolean;
  guestMode: boolean;
  userId: string;
  userFullName: string;
  className?: string;
  editUserFormContainer: React.ReactNode;
}

export function UserItemActionMenuTrigger({
  showDeleteMenuItem,
  guestMode,
  userId,
  userFullName,
  className,
  editUserFormContainer,
}: UserItemActionMenuTriggerProps) {
  const t = useTranslations("users.UserItemActionMenuTrigger");

  // Separate modal state for creating an user
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

  // Modal state for deleting the user
  const { setState: setDeleteUserModalState } = useDeleteUserModal();

  // Guest mode
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Menu actions: show guest modal, show edit user modal, show delete user modal
  function handleAction(key: Key) {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "edit") {
      setIsEditUserModalOpen(true);
    } else if (key === "delete") {
      setDeleteUserModalState({
        isOpen: true,
        userId,
        userFullName,
      });
    }
  }

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <ItemBaseActionMenuButton
            className={className}
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

      {/* Modal for editing task details */}
      <EditUserModal
        isOpen={isEditUserModalOpen}
        onOpenChange={setIsEditUserModalOpen}
        editUserFormContainer={editUserFormContainer}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
