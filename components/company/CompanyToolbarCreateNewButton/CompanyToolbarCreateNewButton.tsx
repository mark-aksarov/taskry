"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { NewCompanyModal } from "../NewCompanyModal";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { ToolbarCreateNewButton } from "@/components/common/Toolbar";

interface CompanyToolbarCreateNewButtonProps {
  guestMode: boolean;
  newCompanyForm: React.ReactNode;
}

export function CompanyToolbarCreateNewButton({
  guestMode,
  newCompanyForm,
}: CompanyToolbarCreateNewButtonProps) {
  const t = useTranslations("company.CompanyToolbarCreateNewButton");

  // Create new company modal
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);

  // Guest mode
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  const handlePress = () => {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    setIsCompanyModalOpen(true);
  };

  return (
    <>
      <ToolbarCreateNewButton
        data-test="company-toolbar-create-new-button"
        label={t("label")}
        onPress={handlePress}
      />
      <NewCompanyModal
        isOpen={isCompanyModalOpen}
        onOpenChange={setIsCompanyModalOpen}
        newCompanyForm={newCompanyForm}
      />
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
