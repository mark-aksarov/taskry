"use client";

import { useTranslations } from "next-intl";
import { KeyRound, Trash } from "lucide-react";
import { useRole } from "@/common/RoleContext";
import { useDeleteUser } from "../DeleteUserContext";
import { useSession } from "@/common/SessionContext";
import { useModal } from "@/common/ModalManagerContext";
import { useChangePassword } from "../ChangePasswordContext";
import { NavigationButton } from "@/dashboard/common/NavigationItem";

interface ProfileActionsProps {
  userId: string;
}

export function ProfileActions({ userId }: ProfileActionsProps) {
  const t = useTranslations("dashboard.users.ProfileActions");

  // Delete user action and modal states
  const { isPending: isDeletePending } = useDeleteUser();
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteUser");

  // session user
  const role = useRole();
  const session = useSession();
  const isSessionUserProfile = session?.user.id === userId;

  // Change password action and modal states
  const { isPending: isChangePasswordPending } = useChangePassword();
  const { onOpenChange: onChangePasswordModalOpenChange } =
    useModal("changePassword");

  function handlePasswordChangePress() {
    onChangePasswordModalOpenChange(true);
  }

  function handleDeletePress() {
    onDeleteModalOpenChange(true);
  }

  // Only owners can delete the user, and user cannot delete his own account
  const showDeleteButton = role === "owner" && !isSessionUserProfile;

  // Users can change their own passwords.
  const showChangePasswordButton = isSessionUserProfile;

  return (
    <>
      <div data-test="profile-actions" className="flex flex-col gap-2.5">
        {showDeleteButton && (
          <NavigationButton
            data-test="delete-user-button"
            onPress={handleDeletePress}
            variant="secondary"
            isPending={isDeletePending}
            iconLeft={<Trash size={18} />}
            label={t("delete")}
          />
        )}
        {showChangePasswordButton && (
          <NavigationButton
            data-test="change-password-button"
            onPress={handlePasswordChangePress}
            variant="secondary"
            isPending={isChangePasswordPending}
            isDisabled={isDeletePending}
            iconLeft={<KeyRound size={18} />}
            label={t("changePassword")}
          />
        )}
      </div>
    </>
  );
}
