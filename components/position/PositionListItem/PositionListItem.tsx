"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { useTranslations } from "next-intl";
import { PositionItemCheckbox } from "../PositionItemCheckbox";

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

  return (
    <ListItem data-test="position-list-item">
      <PositionItemCheckbox id={id} />
      <ListItemInfo>
        <ListItemTitle>{name}</ListItemTitle>
        <ListItemText>{t("name")}</ListItemText>
      </ListItemInfo>

      {menuTrigger}
    </ListItem>
  );
}
