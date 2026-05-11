"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/dashboard/common/ListItem";

import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { PositionItemCheckbox } from "../PositionItemCheckbox";
import { SelectablePositionItem } from "../SelectablePositionItem";
import { usePositionListItemPending } from "./usePositionListItemPending";
import { PositionListItemActionMenuTrigger } from "./PositionListItemActionMenuTrigger";

interface PositionListItemProps {
  id: number;
  name: string;
}

export function PositionListItem(props: PositionListItemProps) {
  const isPending = usePositionListItemPending(props.id);

  return (
    <SelectablePositionItem positionId={props.id}>
      <PositionListItemInner {...props} isPending={isPending} />
    </SelectablePositionItem>
  );
}

type InnerProps = PositionListItemProps & {
  isPending: boolean;
};

const PositionListItemInner = memo(function PositionListItemInner({
  id,
  name,
  isPending,
}: InnerProps) {
  const t = useTranslations("dashboard.positions.PositionListItem");

  return (
    <ListItem
      data-test="position-list-item"
      className={twMerge(
        "flex w-full items-center gap-4",
        isPending && "*:opacity-50",
      )}
    >
      <PositionItemCheckbox id={id} name={name} />
      <ListItemInfo>
        <ListItemTitle>{name}</ListItemTitle>
        <ListItemText>{t("name")}</ListItemText>
      </ListItemInfo>

      <PositionListItemActionMenuTrigger positionId={id} />
    </ListItem>
  );
});
