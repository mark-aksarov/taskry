"use client";

import {
  ToolbarManageMenuTrigger,
  ToolbarManageButtonMobile,
  ToolbarManageButtonDesktop,
} from "@/components/common/Toolbar";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { Building2 } from "lucide-react";

export function CustomerToolbarManageMenuTrigger() {
  const t = useTranslations("projects.CustomerToolbarManageMenuTrigger");

  return (
    <ToolbarManageMenuTrigger
      renderButton={() => (
        <>
          <ToolbarManageButtonMobile data-test="customer-toolbar-manage-button-mobile" />
          <ToolbarManageButtonDesktop data-test="customer-toolbar-manage-button-desktop" />
        </>
      )}
    >
      <Item href="/companies">
        <Building2 size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("companies")}
      </Item>
    </ToolbarManageMenuTrigger>
  );
}
