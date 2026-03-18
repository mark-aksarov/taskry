"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { UserSortField } from "@/lib/types";
import { ALargeSmall, BriefcaseBusiness } from "lucide-react";
import { SortingMenuTrigger } from "@/components/common/SortingMenuTrigger";

interface UserSortingMenuTriggerProps {
  selectedSortField: UserSortField;
  renderButton: () => React.ReactNode;
}

export function UserSortingMenuTrigger({
  selectedSortField,
  renderButton,
}: UserSortingMenuTriggerProps) {
  const t = useTranslations("users.UserSortingMenuTrigger");

  return (
    <SortingMenuTrigger
      selectedKeys={[selectedSortField]}
      renderButton={renderButton}
    >
      <Item textValue={t("byFullName")} key="fullName">
        <ALargeSmall size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byFullName")}
      </Item>
      <Item textValue={t("byPosition")} key="position">
        <BriefcaseBusiness size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byPosition")}
      </Item>
    </SortingMenuTrigger>
  );
}
