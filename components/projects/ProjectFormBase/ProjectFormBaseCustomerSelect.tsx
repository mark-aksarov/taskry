"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

interface ProjectFormBaseCustomerSelectProps {
  defaultSelectedKey?: string;
  customers: { id: number; fullName: string }[];
}

export function ProjectFormBaseCustomerSelect({
  defaultSelectedKey,
  customers,
}: ProjectFormBaseCustomerSelectProps) {
  const t = useTranslations("projects.ProjectFormBaseCustomerSelect");

  return (
    <ResponsiveSelect
      data-test="customer-select"
      label={t("label")}
      name="customerId"
      placeholder={t("placeholder")}
      overlayClassName="w-[var(--trigger-width)]"
      defaultSelectedKey={defaultSelectedKey}
      items={customers.map((item) => ({ id: item.id, label: item.fullName }))}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
