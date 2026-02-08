"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

interface CustomerCompanySelectProps {
  defaultSelectedKey?: string;
  companies: { id: number; name: string }[];
}

export function CustomerCompanySelect({
  defaultSelectedKey,
  companies,
}: CustomerCompanySelectProps) {
  const t = useTranslations("customers.CustomerCompanySelect");

  const items = [
    { id: "", label: t("noCompany") },
    ...companies.map((item) => ({ id: item.id, label: item.name })),
  ];

  return (
    <ResponsiveSelect
      label={t("label")}
      name="companyId"
      data-test="company-select"
      overlayClassName="w-[var(--trigger-width)]"
      defaultSelectedKey={defaultSelectedKey || ""}
      items={items}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
