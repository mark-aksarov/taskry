"use client";

import {
  Button,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Key, useOverlayTrigger } from "react-aria";
import { Building2, Contact, Plus } from "lucide-react";
import { Item, useOverlayTriggerState } from "react-stately";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import { NewCustomerModal } from "./NewCustomerModal";
import { NewCompanyModal } from "./NewCompanyModal/NewCompanyModal";

interface CustomerToolbarCreateNewMenuTriggerProps {
  newCustomerForm: React.ReactNode;
  newCompanyForm: React.ReactNode;
}

export function CustomerToolbarCreateNewMenuTrigger({
  newCustomerForm,
  newCompanyForm,
}: CustomerToolbarCreateNewMenuTriggerProps) {
  const t = useTranslations("customers.CustomerToolbarCreateNewMenuTrigger");

  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);
  const [isOpenCustomerModal, setIsOpenCustomerModal] = useState(false);
  const [isOpenCompanyModal, setIsOpenCompanyModal] = useState(false);

  function handleAction(key: Key) {
    if (key === "customer") {
      setIsOpenCustomerModal(true);
    } else if (key === "company") {
      setIsOpenCompanyModal(true);
    }
  }

  return (
    <>
      <ResponsiveMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeader>
            <DialogHeading>{t("dialogHeading")}</DialogHeading>
            <DialogCloseButton />
          </DialogHeader>
        )}
        overlayClassName="md:min-w-[200px]"
        renderButton={() => (
          <Button
            {...triggerProps}
            label={t("label")}
            iconLeft={<Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />}
          />
        )}
        placement="bottom right"
      >
        <Item textValue={t("items.customer")} key="customer">
          <Contact size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.customer")}
        </Item>
        <Item textValue={t("items.company")} key="company">
          <Building2 size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.company")}
        </Item>
      </ResponsiveMenuTrigger>

      <NewCustomerModal
        newCustomerForm={newCustomerForm}
        isOpen={isOpenCustomerModal}
        onOpenChange={setIsOpenCustomerModal}
      />

      <NewCompanyModal
        newCompanyForm={newCompanyForm}
        isOpen={isOpenCompanyModal}
        onOpenChange={setIsOpenCompanyModal}
      />
    </>
  );
}
