"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { UserSortField } from "@/lib/types";
import { ALargeSmall, BriefcaseBusiness } from "lucide-react";
import { SortingMenuTrigger } from "@/dashboard/common/SortingMenuTrigger";

interface UserSortingMenuTriggerProps {
  selectedSortField: UserSortField;
  renderButton: () => React.ReactNode;
}

export function UserSortingMenuTrigger({
  selectedSortField,
  renderButton,
}: UserSortingMenuTriggerProps) {
  const t = useTranslations("dashboard.users.UserSortingMenuTrigger");

  return (
    <SortingMenuTrigger
      selectedKeys={[selectedSortField]}
      renderButton={renderButton}
    >
      <Item textValue={t("byFullName")} key="fullName">
        <ALargeSmall    />
        {t("byFullName")}
      </Item>
      <Item textValue={t("byPosition")} key="position">
        <BriefcaseBusiness    />
        {t("byPosition")}
      </Item>
    </SortingMenuTrigger>
  );
}
