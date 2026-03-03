"use client";

import { useTranslations } from "next-intl";
import { startTransition, useState } from "react";
import { useUpdateUser } from "../UpdateUserContext";
import { useDeleteUser } from "../DeleteUserContext";
import { KeyRound, Pencil, Trash } from "lucide-react";
import { BaseDeleteUserModal } from "../DeleteUserModal";
import { useChangePassword } from "../ChangePasswordContext";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { NavigationButton } from "@/components/common/NavigationButton";

interface ProfileActionsProps {
  userId: string;
  userFullName: string;
}

export function ProfileActions({ userId, userFullName }: ProfileActionsProps) {
  const t = useTranslations("users.ProfileActions");

  // Delete user action and modal states
  const { action: deleteUserAction, isPending: isDeletePending } =
    useDeleteUser();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Guest mode
  const { isGuest, isOwner, userId: currentUserId } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Change password action and modal states
  const { isPending: isChangePasswordPending } = useChangePassword();
  const { onModalOpenChange: onChangePasswordModalOpenChange } =
    useChangePassword();

  // Edit user modal state
  const { isPending: isUpdateUserPending } = useUpdateUser();
  const { onModalOpenChange: onEditModalOpenChange } = useUpdateUser();

  function handlePasswordChangePress() {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }
    onChangePasswordModalOpenChange(true);
  }

  function handleEditPress() {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }
    onEditModalOpenChange(true);
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
    startTransition(() =>
      deleteUserAction({ id: userId, shouldRedirect: true }),
    );
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
          isPending={isChangePasswordPending}
          iconLeft={
            <KeyRound size={18} strokeWidth={1.5} absoluteStrokeWidth />
          }
          label={t("changePassword")}
        />
        <NavigationButton
          data-test="edit-user-button"
          onPress={handleEditPress}
          variant="secondary"
          isPending={isUpdateUserPending}
          iconLeft={<Pencil size={18} strokeWidth={1.5} absoluteStrokeWidth />}
          label={t("editAccount")}
        />
      </div>

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
