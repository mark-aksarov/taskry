"use client";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { ItemBaseActionMenuTrigger } from "../common/ItemBase";

export function SubtaskActionMenuTrigger() {
  const t = useTranslations("subtasks.SubtaskActionMenuTrigger");

  function handleAction(key: Key) {}

  return (
    <>
      <ItemBaseActionMenuTrigger
        className="-m-1.25 rounded-full"
        iconLeft={
          <EllipsisVertical size={16} absoluteStrokeWidth strokeWidth={1.5} />
        }
        onAction={handleAction}
      >
        <Item textValue={t("edit")} key="edit">
          <Pencil size={16} /> {t("edit")}
        </Item>
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} /> {t("delete")}
        </Item>
      </ItemBaseActionMenuTrigger>
    </>
  );
}
