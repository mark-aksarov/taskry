"use client";

import { Trash } from "lucide-react";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ToolbarActionsMenuTrigger } from "../common/Toolbar";

export const CustomerToolbarActionsMenuTrigger = () => {
  const t = useTranslations("customers.CustomerToolbarActionsMenuTrigger");

  return (
    <ToolbarActionsMenuTrigger>
      <Item textValue={t("delete")} key="delete">
        <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("delete")}
      </Item>
    </ToolbarActionsMenuTrigger>
  );
};
