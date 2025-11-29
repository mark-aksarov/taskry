"use client";

import { Trash } from "lucide-react";
import { Item } from "react-stately";
import { ToolbarActionsMenuTrigger } from "../common/Toolbar";
import { useTranslations } from "next-intl";

export const UserToolbarActionsMenuTrigger = () => {
  const t = useTranslations("users.UserToolbarActionsMenuTrigger");

  return (
    <ToolbarActionsMenuTrigger>
      <Item textValue={t("delete")} key="delete">
        <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("delete")}
      </Item>
    </ToolbarActionsMenuTrigger>
  );
};
