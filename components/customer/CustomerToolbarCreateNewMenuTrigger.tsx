"use client";

import {
  ToolbarCreateNewButton,
  ToolbarCreateNewMenuTrigger,
} from "../common/Toolbar";

import { useState } from "react";
import { Key } from "react-aria";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui";
import { Building2, Contact } from "lucide-react";
import { NewCustomerModal } from "./NewCustomerModal";
import { NewCompanyModal } from "./NewCompanyModal/NewCompanyModal";

interface CustomerToolbarCreateNewMenuTriggerProps {
  newCustomerFormContainer: React.ReactNode;
  newCompanyForm: React.ReactNode;
}

export function CustomerToolbarCreateNewMenuTrigger({
  newCustomerFormContainer,
  newCompanyForm,
}: CustomerToolbarCreateNewMenuTriggerProps) {
  const t = useTranslations("customers.CustomerToolbarCreateNewMenuTrigger");

  // Separate modal state for creating a customer and a company
  const [isOpenCustomerModal, setIsOpenCustomerModal] = useState(false);
  const [isOpenCompanyModal, setIsOpenCompanyModal] = useState(false);

  // Open the corresponding modal based on the selected menu item
  function handleAction(key: Key) {
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
          <ToolbarCreateNewButton
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
    </>
  );
}
