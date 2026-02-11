"use client";

import {
  ToolbarManageMenuTrigger,
  ToolbarManageButtonMobile,
  ToolbarManageButtonDesktop,
} from "@/components/common/Toolbar";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";

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
      <Item href="/project-categories">{t("categories")}</Item>
    </ToolbarManageMenuTrigger>
  );
}
