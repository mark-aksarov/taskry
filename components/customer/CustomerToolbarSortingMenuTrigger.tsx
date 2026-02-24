"use client";

import {
  ToolbarSortingMenuTrigger,
  ToolbarSortingButtonMobile,
  ToolbarSortingButtonDesktop,
} from "@/components/common/Toolbar";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { CustomerSortField } from "@/lib/types";
import { ALargeSmall, Building2 } from "lucide-react";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface CustomerToolbarSortingMenuTriggerProps {
  selectedSortField: CustomerSortField;
}

export function CustomerToolbarSortingMenuTrigger({
  selectedSortField,
}: CustomerToolbarSortingMenuTriggerProps) {
  const t = useTranslations("customers.CustomerToolbarSortingMenuTrigger");
  const { clear: clearSelectedItems } = useSelectedItems();

  return (
    <ToolbarSortingMenuTrigger
      clearSelectedItems={clearSelectedItems}
      selectedKeys={[selectedSortField]}
      renderButton={() => (
        <>
          <ToolbarSortingButtonMobile data-test="customer-toolbar-sorting-button-mobile" />
          <ToolbarSortingButtonDesktop data-test="customer-toolbar-sorting-button-desktop" />
        </>
      )}
    >
      <Item textValue={t("byFullName")} key="fullName">
        <ALargeSmall size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byFullName")}
      </Item>
      <Item textValue={t("byCompany")} key="company">
        <Building2 size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byCompany")}
      </Item>
    </ToolbarSortingMenuTrigger>
  );
}
