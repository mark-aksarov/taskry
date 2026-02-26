"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { PositionItemCheckbox } from "../PositionItemCheckbox";
import { SelectableItem } from "@/components/common/SelectableItem";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { PositionItemActionMenuTrigger } from "../PositionItemActionMenuTrigger";

interface PositionListItemProps {
  id: number;
  name: string;
  guestMode: boolean;
  updatePosition: ActionFn<ActionState, FormData>;
}

export function PositionListItem({
  id,
  name,
  guestMode,
  updatePosition,
}: PositionListItemProps) {
  const t = useTranslations("positions.PositionListItem");
  const selected = useSelectedItems();

  return (
    <SelectableItem {...selected} item={{ id }}>
      <ListItem
        data-test="position-list-item"
        className="flex w-full items-center gap-4"
      >
        <PositionItemCheckbox id={id} />
        <ListItemInfo>
          <ListItemTitle>{name}</ListItemTitle>
          <ListItemText>{t("name")}</ListItemText>
        </ListItemInfo>

        <PositionItemActionMenuTrigger
          guestMode={guestMode}
          positionId={id}
          positionName={name}
          updatePosition={updatePosition}
        />
      </ListItem>
    </SelectableItem>
  );
}
