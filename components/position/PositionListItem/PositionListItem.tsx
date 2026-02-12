"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import {
  usePositionSelection,
  useSyncSelectionPositionItem,
} from "@/lib/hooks/usePositionSelection";

import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";

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

  const { isSelected, toggleItem } = usePositionSelection();
  useSyncSelectionPositionItem(id, name);

  return (
    <ListItem data-test="position-list-item">
      <Checkbox
        data-test="position-checkbox"
        data-id={id}
        aria-label="position checkbox"
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
