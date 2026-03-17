"use client";

import { Key } from "react-aria";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { Building2, Contact } from "lucide-react";
import { DialogHeader } from "@/components/ui/Dialog";
import { useCreateCustomer } from "../CreateCustomerContext";
import { useGuestModeModal } from "@/components/common/GuestModeModal";
import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { useCreateCompany } from "@/components/company/CreateCompanyContext";
import { CreateNewMenuTrigger } from "@/components/common/CreateNewMenuTrigger";

interface CreateCustomerMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function CreateCustomerMenuTrigger({
  renderButton,
}: CreateCustomerMenuTriggerProps) {
  const t = useTranslations("customers.CreateCustomerMenuTrigger");

  // If the user is a guest, show the guest mode modal instead of allowing creation
  const { isGuest } = useCurrentUser();
  const { onOpenChange: onGuestModeModalOpenChange } = useGuestModeModal();

  // Create company form modal state
  const { onModalOpenChange: onCompanyModalOpenChange } = useCreateCompany();

  // Create customer form modal state
  const { onModalOpenChange: onCustomerModalOpenChange } = useCreateCustomer();

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
      <CreateNewMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeader>{t("dialogHeading")}</DialogHeader>
        )}
        renderButton={renderButton}
      >
        <Item textValue={t("items.customer")} key="customer">
          <Contact size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.customer")}
        </Item>
        <Item textValue={t("items.company")} key="company">
          <Building2 size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.company")}
        </Item>
      </CreateNewMenuTrigger>
    </>
  );
}
