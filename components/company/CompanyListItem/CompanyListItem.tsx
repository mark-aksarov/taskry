"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { useTranslations } from "next-intl";
import { SelectableItem } from "@/components/common/SelectableItem";
import { CompanyListItemCheckbox } from "./CompanyListItemCheckbox";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

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
  const selected = useSelectedItems();

  return (
    <SelectableItem {...selected} item={{ id }}>
      <ListItem data-test="company-list-item">
        <CompanyListItemCheckbox id={id} />
        <ListItemInfo>
          <ListItemTitle>{name}</ListItemTitle>
          <ListItemText>{t("name")}</ListItemText>
        </ListItemInfo>

        {menuTrigger}
      </ListItem>
    </SelectableItem>
  );
}
