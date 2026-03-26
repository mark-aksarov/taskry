"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { CompanyListItemCheckbox } from "./CompanyListItemCheckbox";
import { SelectableItem } from "@/components/common/SelectableItem";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { CompanyListItemPendingOverlay } from "./CompanyListItemPendingOverlay";
import { CompanyListItemActionMenuTrigger } from "./CompanyListItemActionMenuTrigger";

interface CompanyListItemProps {
  id: number;
  name: string;
}

export function CompanyListItem(props: CompanyListItemProps) {
  const selected = useSelectedItems();

  return (
    <CompanyListItemPendingOverlay companyId={props.id}>
      <SelectableItem {...selected} item={{ id: props.id }}>
        <CompanyListItemInner {...props} />
      </SelectableItem>
    </CompanyListItemPendingOverlay>
  );
}

const CompanyListItemInner = memo(({ id, name }: CompanyListItemProps) => {
  const t = useTranslations("company.CompanyListItem");

  return (
    <ListItem
      data-test="company-list-item "
      className="flex w-full items-center gap-4"
    >
      <CompanyListItemCheckbox id={id} />
      <ListItemInfo>
        <ListItemTitle>{name}</ListItemTitle>
        <ListItemText>{t("name")}</ListItemText>
      </ListItemInfo>

      <CompanyListItemActionMenuTrigger companyId={id} />
    </ListItem>
  );
});
