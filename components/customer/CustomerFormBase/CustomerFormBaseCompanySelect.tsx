"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

interface CustomerFormBaseCompanySelectProps {
  defaultSelectedKey?: string;
  companies: { id: number; name: string }[];
}

export function CustomerFormBaseCompanySelect({
  defaultSelectedKey,
  companies,
}: CustomerFormBaseCompanySelectProps) {
  const t = useTranslations("customers.CustomerFormBase.company");

  return (
    <ResponsiveSelect
      label={t("label")}
      name="companyId"
      placeholder={t("placeholder")}
      overlayClassName="w-[var(--trigger-width)]"
      defaultSelectedKey={defaultSelectedKey}
      items={companies.map((item) => ({ id: item.id, label: item.name }))}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
