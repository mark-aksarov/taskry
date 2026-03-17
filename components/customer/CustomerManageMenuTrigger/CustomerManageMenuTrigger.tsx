"use client";

import { Item } from "react-stately";
import { Building2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { ManageMenuTrigger } from "@/components/common/ManageMenuTrigger";

interface CustomerManageMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function CustomerManageMenuTrigger({
  renderButton,
}: CustomerManageMenuTriggerProps) {
  const t = useTranslations("customers.CustomerManageMenuTrigger");

  return (
    <ManageMenuTrigger renderButton={renderButton}>
      <Item textValue={t("companies")} href="/companies">
        <Building2 size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("companies")}
      </Item>
    </ManageMenuTrigger>
  );
}
