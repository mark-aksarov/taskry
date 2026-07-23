"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ClientSortField } from "@/lib/types";
import { ALargeSmall, Building2 } from "lucide-react";
import { useSelectedItems } from "@/dashboard/common/SelectedItemsContext";
import { SortingMenuTrigger } from "@/dashboard/common/SortingMenuTrigger";

interface ClientSortingMenuTriggerProps {
  selectedSortField: ClientSortField;
  renderButton: () => React.ReactNode;
}

export function ClientSortingMenuTrigger({
  selectedSortField,
  renderButton,
}: ClientSortingMenuTriggerProps) {
  const t = useTranslations("dashboard.clients.ClientSortingMenuTrigger");
  const { clear: clearSelectedItems } = useSelectedItems();

  return (
    <SortingMenuTrigger
      clearSelectedItems={clearSelectedItems}
      selectedKeys={[selectedSortField]}
      renderButton={renderButton}
    >
      <Item textValue={t("byFullName")} key="fullName">
        <ALargeSmall    />
        {t("byFullName")}
      </Item>
      <Item textValue={t("byCompany")} key="company">
        <Building2    />
        {t("byCompany")}
      </Item>
    </SortingMenuTrigger>
  );
}
