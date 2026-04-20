"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { BriefcaseBusiness } from "lucide-react";
import { ManageMenuTrigger } from "@/dashboard/common/ManageMenuTrigger";

interface UserManageMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function UserManageMenuTrigger({
  renderButton,
}: UserManageMenuTriggerProps) {
  const t = useTranslations("dashboard.users.UserManageMenuTrigger");

  return (
    <ManageMenuTrigger renderButton={renderButton}>
      <Item textValue={t("positions")} href="/positions">
        <BriefcaseBusiness size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("positions")}
      </Item>
    </ManageMenuTrigger>
  );
}
