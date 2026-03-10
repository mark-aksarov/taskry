"use client";

import {
  ToolbarManageMenuTrigger,
  ToolbarManageButtonMobile,
  ToolbarManageButtonDesktop,
} from "@/components/common/Toolbar";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { Blocks } from "lucide-react";

export function ProjectToolbarManageMenuTrigger() {
  const t = useTranslations("projects.ProjectToolbarManageMenuTrigger");

  return (
    <ToolbarManageMenuTrigger
      renderButton={() => (
        <>
          <ToolbarManageButtonMobile data-test="project-toolbar-manage-button-mobile" />
          <ToolbarManageButtonDesktop data-test="project-toolbar-manage-button-desktop" />
        </>
      )}
    >
      <Item textValue={t("categories")} href="/project-categories">
        <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("categories")}
      </Item>
    </ToolbarManageMenuTrigger>
  );
}
