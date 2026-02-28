"use client";

import { useTranslations } from "next-intl";
import { EditUserModal } from "../EditUserModal";
import { startTransition, useState } from "react";
import { KeyRound, Pencil, Trash } from "lucide-react";
import { BaseDeleteUserModal } from "../DeleteUserModal";
import { ChangePasswordModal } from "../ChangePasswordModal";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { NavigationButton } from "@/components/common/NavigationButton";
import { ActionFn, ActionState, DeleteUserPayload } from "@/lib/actions/types";
import { useDeletePageActionState } from "@/lib/hooks/useDeleteEntityPageActionState";
import { useCurrentUser } from "@/components/common/CurrentUserContext";

interface ProfileActionsProps {
  userId: string;
  userFullName: string;
  changePassword: ActionFn<ActionState, FormData>;
  deleteUser: ActionFn<ActionState, DeleteUserPayload>;
  editUserFormContainer: React.ReactNode;
}

export function ProfileActions({
  userId,
  userFullName,
  changePassword,
  deleteUser,
  editUserFormContainer,
}: ProfileActionsProps) {
  const t = useTranslations("users.ProfileActions");

  // Deleting the user
  const [, action, isDeletePending] = useDeletePageActionState({
    deleteEntity: deleteUser,
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Guest mode
  const { isGuest, isOwner, userId: currentUserId } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Change password modal state
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  // Edit user modal state
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

  function handlePasswordChangePress() {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }
    setIsChangePasswordModalOpen(true);
  }

  function handleEditPress() {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }
    setIsEditUserModalOpen(true);
  }

  function handleDeletePress() {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }
    setIsDeleteModalOpen(true);
  }

  function handleDelete() {
    setIsDeleteModalOpen(false);
    startTransition(() => action({ id: userId, shouldRedirect: true }));
  }

  // Only owners can delete the user, and user cannot delete his own account
  // Guest users can interact with any UI
  const showDeleteButton = (isOwner && currentUserId !== userId) || isGuest;

  return (
    <>
      <div data-test="profile-actions" className="flex flex-col gap-2.5">
        {showDeleteButton && (
          <NavigationButton
            data-test="delete-user-button"
            onPress={handleDeletePress}
            variant="secondary"
            isPending={isDeletePending}
            iconLeft={<Trash size={18} strokeWidth={1.5} absoluteStrokeWidth />}
            label={t("delete")}
          />
        )}
        <NavigationButton
          data-test="change-password-button"
          onPress={handlePasswordChangePress}
          variant="secondary"
          iconLeft={
            <KeyRound size={18} strokeWidth={1.5} absoluteStrokeWidth />
          }
          label={t("changePassword")}
        />
        <NavigationButton
          data-test="edit-user-button"
          onPress={handleEditPress}
          variant="secondary"
          iconLeft={<Pencil size={18} strokeWidth={1.5} absoluteStrokeWidth />}
          label={t("editAccount")}
        />
      </div>

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onOpenChange={setIsChangePasswordModalOpen}
        userId={userId}
        changePassword={changePassword}
      />

      <EditUserModal
        isOpen={isEditUserModalOpen}
        onOpenChange={setIsEditUserModalOpen}
        editUserFormContainer={editUserFormContainer}
      />

      {showDeleteButton && (
        <BaseDeleteUserModal
          isOpen={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          userFullName={userFullName}
          onDelete={handleDelete}
        />
      )}

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
