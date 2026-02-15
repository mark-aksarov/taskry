"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { useTranslations } from "next-intl";
import { CompanyListItemCheckbox } from "./CompanyListItemCheckbox";

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

  return (
    <ListItem data-test="company-list-item">
      <CompanyListItemCheckbox id={id} />
      <ListItemInfo>
        <ListItemTitle>{name}</ListItemTitle>
        <ListItemText>{t("name")}</ListItemText>
      </ListItemInfo>

      {menuTrigger}
    </ListItem>
  );
}
