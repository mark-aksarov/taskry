"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "../common/ItemBase";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";

export function SubtaskActionMenuTrigger() {
  const t = useTranslations("subtasks.SubtaskActionMenuTrigger");

  function handleAction(key: Key) {}

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <ItemBaseActionMenuButton
            className="-m-1.25 rounded-full"
            iconLeft={
              <EllipsisVertical
                size={16}
                absoluteStrokeWidth
                strokeWidth={1.5}
              />
            }
          />
        )}
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
