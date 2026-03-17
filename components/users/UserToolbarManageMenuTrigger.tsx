"use client";

import {
  ToolbarManageMenuTrigger,
  ToolbarManageButtonMobile,
  ToolbarManageButtonDesktop,
} from "@/components/common/ToolbarOld";

import { Item } from "react-stately";
import { Building2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function UserToolbarManageMenuTrigger() {
  const t = useTranslations("users.UserToolbarManageMenuTrigger");

  return (
    <ToolbarManageMenuTrigger
      renderButton={() => (
        <>
          <ToolbarManageButtonMobile data-test="user-toolbar-manage-button-mobile" />
          <ToolbarManageButtonDesktop data-test="user-toolbar-manage-button-desktop" />
        </>
      )}
    >
      <Item textValue={t("positions")} href="/positions">
        <Building2 size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("positions")}
      </Item>
    </ToolbarManageMenuTrigger>
  );
}
