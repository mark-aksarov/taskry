"use client";

import { Key } from "react-aria";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { Building2, Contact } from "lucide-react";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";
import { CreateNewMenuTrigger } from "@/dashboard/common/CreateNewMenuTrigger";

interface CreateCustomerMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function CreateCustomerMenuTrigger({
  renderButton,
}: CreateCustomerMenuTriggerProps) {
  const t = useTranslations("dashboard.customers.CreateCustomerMenuTrigger");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Create company modal state
  const { onOpenChange: onCreateCompanyModalOpenChange } =
    useModal("createCompany");

  // Create customer modal state
  const { onOpenChange: onCreateCustomerModalOpenChange } =
    useModal("createCustomer");

  /**
   * Handles menu actions for creating a customer or company
   * - If user is a guest, show guest modal
   * - Otherwise, open create company modal or create customer modal
   */
  function handleAction(key: Key) {
    guestGuard(() => {
      if (key === "customer") {
        onCreateCustomerModalOpenChange(true);
      } else if (key === "company") {
        onCreateCompanyModalOpenChange(true);
      }
    });
  }

  return (
    <>
      <CreateNewMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
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
