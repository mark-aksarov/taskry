"use client";

import { useTranslations } from "next-intl";
import { useCreateCompany } from "./CreateCompanyContext";
import { useGuestModeModal } from "../common/GuestModeModal";
import { useCurrentUser } from "../common/CurrentUserContext";
import { ToolbarCreateNewModalTrigger } from "@/components/common/Toolbar";

export function CompanyToolbarCreateNewModalTrigger() {
  const t = useTranslations("company.CompanyToolbarCreateNewModalTrigger");

  // If the user is a guest, show the guest mode modal instead of allowing creation
  const { isGuest } = useCurrentUser();
  const { onOpenChange: onGuestModeModalOpenChange } = useGuestModeModal();

  // Create company action and modal states
  const {
    isPending: isCreateCompanyPending,
    onModalOpenChange: onCompanyModalOpenChange,
  } = useCreateCompany();

  /**
   * Handles menu actions for creating a company
   * - If user is a guest, show guest modal
   * - Otherwise, open create company modal
   */
  const handlePress = () => {
    if (isGuest) {
      onGuestModeModalOpenChange(true);
      return;
    }

    onCompanyModalOpenChange(true);
  };

  return (
    <>
      <ToolbarCreateNewModalTrigger
        data-test="company-toolbar-create-new-modal-trigger"
        label={t("label")}
        onPress={handlePress}
        // Block creating another company until the current request completes
        isDisabled={isCreateCompanyPending}
      />
    </>
  );
}
