"use client";

import {
  ToolbarSortingMenuTrigger,
  ToolbarSortingButtonMobile,
  ToolbarSortingButtonDesktop,
} from "@/components/common/Toolbar";

import { Item } from "react-stately";
import { UserSortField } from "@/lib/types";
import { useTranslations } from "next-intl";
import { ALargeSmall, BriefcaseBusiness } from "lucide-react";

interface UserToolbarSortingMenuTriggerProps {
  selectedSortField: UserSortField;
}

export function UserToolbarSortingMenuTrigger({
  selectedSortField,
}: UserToolbarSortingMenuTriggerProps) {
  const t = useTranslations("users.UserToolbarSortingMenuTrigger");

  return (
    <ToolbarSortingMenuTrigger
      selectedKeys={[selectedSortField]}
      renderButton={() => (
        <>
          <ToolbarSortingButtonMobile data-test="user-toolbar-sorting-button-mobile" />
          <ToolbarSortingButtonDesktop data-test="user-toolbar-sorting-button-desktop" />
        </>
      )}
    >
      <Item textValue={t("byFullName")} key="fullName">
        <ALargeSmall size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byFullName")}
      </Item>
      <Item textValue={t("byPosition")} key="position">
        <BriefcaseBusiness size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byPosition")}
      </Item>
    </ToolbarSortingMenuTrigger>
  );
}
