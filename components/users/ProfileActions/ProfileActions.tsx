"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { KeyRound, Pencil } from "lucide-react";
import { EditUserModal } from "../EditUserModal";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ChangePasswordModal } from "../ChangePasswordModal";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { NavigationButton } from "@/components/common/NavigationButton";

interface ProfileActionsProps {
  guestMode: boolean;
  userId: string;
  changePassword: ActionFn<ActionState, FormData>;
  editUserFormContainer: React.ReactNode;
}

export function ProfileActions({
  guestMode,
  userId,
  changePassword,
  editUserFormContainer,
}: ProfileActionsProps) {
  const t = useTranslations("users.ProfileActions");

  // Guest mode modal state
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Change password modal state
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  // Edit user modal state
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

  function handlePasswordChangePress() {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }
    setIsChangePasswordModalOpen(true);
  }

  function handleEditPress() {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }
    setIsEditUserModalOpen(true);
  }

  return (
    <>
      <div data-test="profile-actions" className="flex flex-col gap-2.5">
        <NavigationButton
          data-test="change-password-button"
          onPress={handlePasswordChangePress}
          variant="secondary"
        >
          <KeyRound size={18} strokeWidth={1.5} absoluteStrokeWidth />
          {t("changePassword")}
        </NavigationButton>
        <NavigationButton
          data-test="edit-user-button"
          onPress={handleEditPress}
          variant="secondary"
        >
          <Pencil size={18} strokeWidth={1.5} absoluteStrokeWidth />
          {t("editAccount")}
        </NavigationButton>
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

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
