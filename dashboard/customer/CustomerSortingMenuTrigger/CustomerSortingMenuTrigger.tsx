"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { CustomerSortField } from "@/lib/types";
import { ALargeSmall, Building2 } from "lucide-react";
import { useSelectedItems } from "@/dashboard/common/SelectedItemsContext";
import { SortingMenuTrigger } from "@/dashboard/common/SortingMenuTrigger";

interface CustomerSortingMenuTriggerProps {
  selectedSortField: CustomerSortField;
  renderButton: () => React.ReactNode;
}

export function CustomerSortingMenuTrigger({
  selectedSortField,
  renderButton,
}: CustomerSortingMenuTriggerProps) {
  const t = useTranslations("dashboard.customers.CustomerSortingMenuTrigger");
  const { clear: clearSelectedItems } = useSelectedItems();

  return (
    <SortingMenuTrigger
      clearSelectedItems={clearSelectedItems}
      selectedKeys={[selectedSortField]}
      renderButton={renderButton}
    >
      <Item textValue={t("byFullName")} key="fullName">
        <ALargeSmall size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byFullName")}
      </Item>
      <Item textValue={t("byCompany")} key="company">
        <Building2 size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byCompany")}
      </Item>
    </SortingMenuTrigger>
  );
}
