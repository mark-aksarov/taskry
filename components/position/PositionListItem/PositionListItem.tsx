"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { useTranslations } from "next-intl";
import { PositionItemCheckbox } from "../PositionItemCheckbox";
import { SelectableItem } from "@/components/common/SelectableItem";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface PositionListItemProps {
  id: number;
  name: string;
  menuTrigger: React.ReactNode;
}

export function PositionListItem({
  id,
  name,
  menuTrigger,
}: PositionListItemProps) {
  const t = useTranslations("positions.PositionListItem");
  const selected = useSelectedItems();

  return (
    <SelectableItem {...selected} item={{ id }}>
      <ListItem data-test="position-list-item">
        <PositionItemCheckbox id={id} />
        <ListItemInfo>
          <ListItemTitle>{name}</ListItemTitle>
          <ListItemText>{t("name")}</ListItemText>
        </ListItemInfo>

        {menuTrigger}
      </ListItem>
    </SelectableItem>
  );
}
