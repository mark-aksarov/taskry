"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { NewCompanyModal } from "./NewCompanyModal";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { ToolbarCreateNewModalTrigger } from "@/components/common/Toolbar";

interface CompanyToolbarCreateNewModalTriggerProps {
  guestMode: boolean;
  createCompany: ActionFn<ActionState, FormData>;
}

export function CompanyToolbarCreateNewModalTrigger({
  guestMode,
  createCompany,
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
        data-test="company-toolbar-create-new-modal-trigger"
        label={t("label")}
        onPress={handlePress}
      />
      <NewCompanyModal
        isOpen={isCompanyModalOpen}
        onOpenChange={setIsCompanyModalOpen}
        createCompany={createCompany}
      />
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
