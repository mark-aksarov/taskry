"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import {
  useCompanySelection,
  useSyncSelectionCompanyItem,
} from "@/lib/hooks/useCompanySelection";

import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";

interface CompanyListItemProps {
  id: number;
  name: string;
  menuTrigger: React.ReactNode;
}

export function CompanyListItem({
  id,
  name,
  menuTrigger,
}: CompanyListItemProps) {
  const t = useTranslations("company.CompanyListItem");

  const { isSelected, toggleItem } = useCompanySelection();
  useSyncSelectionCompanyItem(id, name);

  return (
    <ListItem data-test="company-list-item">
      <Checkbox
        data-test="company-checkbox"
        data-id={id}
        aria-label="company checkbox"
        isSelected={isSelected(id)}
        onChange={() => toggleItem(id)}
      />
      <ListItemInfo>
        <ListItemTitle>{name}</ListItemTitle>
        <ListItemText>{t("name")}</ListItemText>
      </ListItemInfo>

      {menuTrigger}
    </ListItem>
  );
}
