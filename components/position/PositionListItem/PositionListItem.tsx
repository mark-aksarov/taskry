"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { PositionItemCheckbox } from "../PositionItemCheckbox";
import { SelectableItem } from "@/components/common/SelectableItem";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { PositionListItemPendingOverlay } from "./PositionListItemPendingOverlay";
import { DeletePositionTransitionProvider } from "../DeletePositionTransitionContext";
import { PositionListItemActionMenuTrigger } from "./PositionListItemActionMenuTrigger";
import { UpdatePositionTransitionProvider } from "../UpdatePositionTransitionContext";

interface PositionListItemProps {
  id: number;
  name: string;
  updatePosition: ActionFn<ActionState, FormData>;
  deletePosition: ActionFn<ActionState, number[]>;
}

export function PositionListItem(props: PositionListItemProps) {
  const selected = useSelectedItems();

  return (
    <UpdatePositionTransitionProvider>
      <DeletePositionTransitionProvider>
        <PositionListItemPendingOverlay companyId={props.id}>
          <SelectableItem {...selected} item={{ id: props.id }}>
            <PositionListItemInner {...props} />
          </SelectableItem>
        </PositionListItemPendingOverlay>
      </DeletePositionTransitionProvider>
    </UpdatePositionTransitionProvider>
  );
}

const PositionListItemInner = memo(
  ({ id, name, updatePosition, deletePosition }: PositionListItemProps) => {
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

        <PositionListItemActionMenuTrigger
          positionId={id}
          positionName={name}
          updatePosition={updatePosition}
          deletePosition={deletePosition}
        />
      </ListItem>
    );
  },
);
