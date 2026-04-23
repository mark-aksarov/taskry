"use client";

import { useTranslations } from "next-intl";
import { KeyRound, Trash } from "lucide-react";
import { useDeleteUser } from "../DeleteUserContext";
import { useChangePassword } from "../ChangePasswordContext";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useCurrentUser } from "@/dashboard/common/CurrentUserContext";
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
      </div>
    </>
  );
}
