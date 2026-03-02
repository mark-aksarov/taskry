"use client";

import {
  ToolbarCreateNewMenuTrigger,
  ToolbarCreateNewModalTrigger,
} from "../common/Toolbar";

import { useState } from "react";
import { Key } from "react-aria";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { Building2, Contact } from "lucide-react";
import { DialogHeader } from "@/components/ui/Dialog";
import { GuestModeModal } from "../common/GuestModeModal";
import { useCreateCustomer } from "./CreateCustomerContext";
import { useCurrentUser } from "../common/CurrentUserContext";
import { useCreateCompany } from "../company/CreateCompanyContext";

export function CustomerToolbarCreateNewMenuTrigger() {
  const t = useTranslations("customers.CustomerToolbarCreateNewMenuTrigger");

  // If the user is a guest, show the guest mode modal instead of allowing creation
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Create company: action state + form modal state
  const {
    isPending: isCreateCompanyPending,
    isModalOpen: isCreateCompanyModalOpen,
    onModalOpenChange: onCompanyModalOpenChange,
  } = useCreateCompany();

  // Create customer: action state + form modal state
  const {
    isPending: isCreateCustomerPending,
    isModalOpen: isCreateCustomerModalOpen,
    onModalOpenChange: onCustomerModalOpenChange,
  } = useCreateCustomer();

  /**
   * Handles menu actions for creating a customer or company
   * - If user is a guest, show guest modal
   * - Otherwise, open create company modal or create customer modal
   */
  function handleAction(key: Key) {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "customer") {
      onCustomerModalOpenChange(true);
    } else if (key === "company") {
      onCompanyModalOpenChange(true);
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
            isDisabled={
              // Block user interactions while a company or customer is being created
              // When the modal opens, a reset action is triggered, the pending state becomes true, and flickering occurs
              (isCreateCompanyPending && !isCreateCompanyModalOpen) ||
              (isCreateCustomerPending && !isCreateCustomerModalOpen)
            }
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

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
