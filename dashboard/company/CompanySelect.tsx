"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ResponsiveSelect } from "@/common/ResponsiveSelect";

interface CompanySelectProps {
  defaultSelectedKey?: string;
  items: { id: number; name: string }[];
}

export function CompanySelect({
  defaultSelectedKey,
  items,
}: CompanySelectProps) {
  const t = useTranslations("dashboard.company.CompanySelect");

  const withNoCompanyItems = [
    { id: "", label: t("noCompany") },
    ...items.map((item) => ({ id: item.id, label: item.name })),
  ];

  return (
    <ResponsiveSelect
      label={t("label")}
      name="companyId"
      data-test="company-select"
      overlayClassName="w-[var(--trigger-width)]"
      defaultSelectedKey={defaultSelectedKey || ""}
      items={withNoCompanyItems}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
