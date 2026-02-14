"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { NewCompanyModal } from "../NewCompanyModal";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { ToolbarCreateNewModalTrigger } from "@/components/common/Toolbar";

interface CompanyToolbarCreateNewModalTriggerProps {
  guestMode: boolean;
  newCompanyForm: React.ReactNode;
}

export function CompanyToolbarCreateNewModalTrigger({
  guestMode,
  newCompanyForm,
}: CompanyToolbarCreateNewModalTriggerProps) {
  const t = useTranslations("company.CompanyToolbarCreateNewModalTrigger");

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
      <ToolbarCreateNewModalTrigger
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
