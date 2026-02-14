"use client";

import {
  ToolbarCreateNewModalTrigger,
  ToolbarCreateNewMenuTrigger,
} from "../../common/Toolbar";

import { useState } from "react";
import { Key } from "react-aria";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { Building2, Contact } from "lucide-react";
import { DialogHeader } from "@/components/ui/Dialog";
import { NewCustomerModal } from "../NewCustomerModal";
import { GuestModeModal } from "../../common/GuestModeModal";
import { NewCompanyModal } from "../../company/NewCompanyModal/NewCompanyModal";

interface CustomerToolbarCreateNewMenuTriggerProps {
  guestMode: boolean;
  newCustomerFormContainer: React.ReactNode;
  newCompanyForm: React.ReactNode;
}

export function CustomerToolbarCreateNewMenuTrigger({
  guestMode,
  newCustomerFormContainer,
  newCompanyForm,
}: CustomerToolbarCreateNewMenuTriggerProps) {
  const t = useTranslations("customers.CustomerToolbarCreateNewMenuTrigger");

  // Separate modal state for creating a customer and a company
  const [isOpenCustomerModal, setIsOpenCustomerModal] = useState(false);
  const [isOpenCompanyModal, setIsOpenCompanyModal] = useState(false);

  // Guest mode
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Open the corresponding modal based on the selected menu item
  function handleAction(key: Key) {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "customer") {
      setIsOpenCustomerModal(true);
    } else if (key === "company") {
      setIsOpenCompanyModal(true);
    }
  }

  return (
    <>
      <ToolbarCreateNewMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeader>{t("dialogHeading")}</DialogHeader>
        )}
        renderButton={() => (
          <ToolbarCreateNewModalTrigger
            data-test="customer-toolbar-create-new-menu-trigger"
            label={t("label")}
          />
        )}
      >
        <Item textValue={t("items.customer")} key="customer">
          <Contact size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.customer")}
        </Item>
        <Item textValue={t("items.company")} key="company">
          <Building2 size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.company")}
        </Item>
      </ToolbarCreateNewMenuTrigger>

      {/* Modal for creating a new customer */}
      <NewCustomerModal
        newCustomerFormContainer={newCustomerFormContainer}
        isOpen={isOpenCustomerModal}
        onOpenChange={setIsOpenCustomerModal}
      />

      {/* Modal for creating a new company */}
      <NewCompanyModal
        newCompanyForm={newCompanyForm}
        isOpen={isOpenCompanyModal}
        onOpenChange={setIsOpenCompanyModal}
      />

      {/* Guest mode modal */}
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
