"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { KeyRound, Pencil } from "lucide-react";
import { ChangePasswordModal } from "../ChangePasswordModal";
import { NavigationButton } from "@/components/common/NavigationButton";
import { GuestModeModal } from "@/components/common/GuestModeModal";

interface ProfileActionsProps {
  guestMode: boolean;
  changePasswordForm: React.ReactNode;
}

export function ProfileActions({
  guestMode,
  changePasswordForm,
}: ProfileActionsProps) {
  const t = useTranslations("users.ProfileActions");

  // Guest mode modal state
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Change password modal state
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  function handlePasswordChangePress() {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }
    setIsChangePasswordModalOpen(true);
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
        <NavigationButton variant="secondary">
          <Pencil size={18} strokeWidth={1.5} absoluteStrokeWidth />
          {t("editAccount")}
        </NavigationButton>
      </div>

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onOpenChange={setIsChangePasswordModalOpen}
        changePasswordForm={changePasswordForm}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
