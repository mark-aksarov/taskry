"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "../common/ItemBase";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { EditUserModal } from "./EditUserModal";
import { DeleteUserModal } from "./DeleteUserModal";
import { GuestModeModal } from "../common/GuestModeModal";
import { ActionFn, ActionState, DeleteUsersPayload } from "@/lib/actions/types";

interface UserItemActionMenuTriggerProps {
  showUserMenuItem: boolean;
  guestMode: boolean;
  userId: string;
  userFullName: string;
  className?: string;
  deleteAction: ActionFn<ActionState, DeleteUsersPayload>;
  editUserFormContainer: React.ReactNode;
}

export function UserItemActionMenuTrigger({
  showUserMenuItem,
  guestMode,
  userId,
  userFullName,
  className,
  deleteAction,
  editUserFormContainer,
}: UserItemActionMenuTriggerProps) {
  const t = useTranslations("users.UserItemActionMenuTrigger");

  // Separate modal state for creating an user
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

  // Modal state for deleting the user
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);

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
      setIsDeleteUserModalOpen(true);
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
            data-test={`user-item-${userId}-action-menu-trigger`}
          />
        )}
      >
        {showUserMenuItem ? (
          <Item textValue={t("edit")} key="edit">
            <Pencil size={16} /> {t("edit")}
          </Item>
        ) : null}
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} /> {t("delete")}
        </Item>
      </ItemBaseActionMenuTrigger>

      {/* Modal for editing task details */}
      <EditUserModal
        isOpen={isEditUserModalOpen}
        onOpenChange={setIsEditUserModalOpen}
        editUserFormContainer={editUserFormContainer}
      />

      {/* Modal for confirming task deletion */}
      <DeleteUserModal
        userId={userId}
        userFullName={userFullName}
        isOpen={isDeleteUserModalOpen}
        onOpenChange={setIsDeleteUserModalOpen}
        deleteAction={deleteAction}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
