"use client";

import { useTranslations } from "next-intl";
import { KeyRound, Trash } from "lucide-react";
import { useDeleteUser } from "../DeleteUserContext";
import { useModal } from "@/common/ModalManagerContext";
import { useResetPassword } from "../ResetPasswordContext";
import { useChangePassword } from "../ChangePasswordContext";
import { useCurrentUser } from "@/common/CurrentUserContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { NavigationButton } from "@/dashboard/common/NavigationItem";

interface ProfileActionsProps {
  userId: string;
}

export function ProfileActions({ userId }: ProfileActionsProps) {
  const t = useTranslations("dashboard.users.ProfileActions");

  // Delete user action and modal states
  const { isPending: isDeletePending } = useDeleteUser();
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteUser");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Current user
  const { isGuest, isOwner, userId: currentUserId } = useCurrentUser();

  // reset password action and modal states
  const { isPending: isResetPasswordPending } = useResetPassword();
  const { onOpenChange: onResetPasswordModalOpenChange } =
    useModal("resetPassword");

  function handlePasswordResetPress() {
    guestGuard(() => onResetPasswordModalOpenChange(true));
  }

  // Change password action and modal states
  const { isPending: isChangePasswordPending } = useChangePassword();
  const { onOpenChange: onChangePasswordModalOpenChange } =
    useModal("changePassword");

  function handlePasswordChangePress() {
    guestGuard(() => onChangePasswordModalOpenChange(true));
  }

  function handleDeletePress() {
    guestGuard(() => onDeleteModalOpenChange(true));
  }

  // Only owners can delete the user, and user cannot delete his own account
  // Guest users can interact with any UI.
  const showDeleteButton = (isOwner && currentUserId !== userId) || isGuest;

  // Only owners can reset passwords and cannot reset their own passwords.
  // Guest users can interact with any UI.
  const showResetPasswordButton =
    (isOwner || isGuest) && currentUserId !== userId;

  // Users can change their own passwords.
  const showChangePasswordButton = currentUserId === userId;

  return (
    <>
      <div data-test="profile-actions" className="flex flex-col gap-2.5">
        {showDeleteButton && (
          <NavigationButton
            data-test="delete-user-button"
            onPress={handleDeletePress}
            variant="secondary"
            isPending={isDeletePending}
            iconLeft={<Trash size={18}   />}
            label={t("delete")}
          />
        )}
        {showResetPasswordButton && (
          <NavigationButton
            data-test="reset-password-button"
            onPress={handlePasswordResetPress}
            variant="secondary"
            isPending={isResetPasswordPending}
            isDisabled={isDeletePending}
            iconLeft={
              <KeyRound size={18}   />
            }
            label={t("resetPassword")}
          />
        )}
        {showChangePasswordButton && (
          <NavigationButton
            data-test="change-password-button"
            onPress={handlePasswordChangePress}
            variant="secondary"
            isPending={isChangePasswordPending}
            isDisabled={isDeletePending}
            iconLeft={
              <KeyRound size={18}   />
            }
            label={t("changePassword")}
          />
        )}
      </div>
    </>
  );
}
