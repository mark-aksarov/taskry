"use client";

import {
  ToolbarCreateNewMenuTrigger,
  ToolbarCreateNewModalTrigger,
} from "../common/Toolbar";

import { Key } from "react-aria";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { Building2, Contact } from "lucide-react";
import { DialogHeader } from "@/components/ui/Dialog";
import { useCreateCustomer } from "./CreateCustomerContext";
import { useGuestModeModal } from "../common/GuestModeModal";
import { useCurrentUser } from "../common/CurrentUserContext";
import { useCreateCompany } from "../company/CreateCompanyContext";

export function CustomerToolbarCreateNewMenuTrigger() {
  const t = useTranslations("customers.CustomerToolbarCreateNewMenuTrigger");

  // If the user is a guest, show the guest mode modal instead of allowing creation
  const { isGuest } = useCurrentUser();
  const { onOpenChange: onGuestModeModalOpenChange } = useGuestModeModal();

  // Create company: action state + form modal state
  const {
    isPending: isCreateCompanyPending,
    onModalOpenChange: onCompanyModalOpenChange,
  } = useCreateCompany();

  // Create customer: action state + form modal state
  const {
    isPending: isCreateCustomerPending,
    onModalOpenChange: onCustomerModalOpenChange,
  } = useCreateCustomer();

  /**
   * Handles menu actions for creating a customer or company
   * - If user is a guest, show guest modal
   * - Otherwise, open create company modal or create customer modal
   */
  function handleAction(key: Key) {
    if (isGuest) {
      onGuestModeModalOpenChange(true);
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
              isCreateCompanyPending || isCreateCustomerPending
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
    </>
  );
}
