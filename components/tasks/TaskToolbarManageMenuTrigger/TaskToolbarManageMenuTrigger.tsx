"use client";

import {
  ToolbarManageMenuTrigger,
  ToolbarManageButtonMobile,
  ToolbarManageButtonDesktop,
} from "@/components/common/Toolbar";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { Blocks } from "lucide-react";

export function TaskToolbarManageMenuTrigger() {
  const t = useTranslations("tasks.TaskToolbarManageMenuTrigger");

  return (
    <ToolbarManageMenuTrigger
      renderButton={() => (
        <>
          <ToolbarManageButtonMobile data-test="task-toolbar-manage-button-mobile" />
          <ToolbarManageButtonDesktop data-test="task-toolbar-manage-button-desktop" />
        </>
      )}
    >
      <Item href="/task-categories">
        <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("categories")}
      </Item>
    </ToolbarManageMenuTrigger>
  );
}
