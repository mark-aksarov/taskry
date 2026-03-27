"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { PositionItemCheckbox } from "../PositionItemCheckbox";
import { SelectableItem } from "@/components/common/SelectableItem";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { PositionListItemPendingOverlay } from "./PositionListItemPendingOverlay";
import { PositionListItemActionMenuTrigger } from "./PositionListItemActionMenuTrigger";

interface PositionListItemProps {
  id: number;
  name: string;
}

export function PositionListItem(props: PositionListItemProps) {
  const selected = useSelectedItems();

  return (
    <PositionListItemPendingOverlay positionId={props.id}>
      <SelectableItem {...selected} item={{ id: props.id }}>
        <PositionListItemInner {...props} />
      </SelectableItem>
    </PositionListItemPendingOverlay>
  );
}

const PositionListItemInner = memo(
  ({ id, name }: Omit<PositionListItemProps, "deletePosition">) => {
    const t = useTranslations("positions.PositionListItem");

    return (
      <ListItem
        data-test="position-list-item"
        className="flex w-full items-center gap-4"
      >
        <PositionItemCheckbox id={id} />
        <ListItemInfo>
          <ListItemTitle>{name}</ListItemTitle>
          <ListItemText>{t("name")}</ListItemText>
        </ListItemInfo>

        <PositionListItemActionMenuTrigger positionId={id} />
      </ListItem>
    );
  },
);
