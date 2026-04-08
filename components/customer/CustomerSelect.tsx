"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

interface CustomerSelectProps {
  defaultSelectedKey?: string;
  items: { id: number; fullName: string }[];
}

export function CustomerSelect({
  defaultSelectedKey,
  items,
}: CustomerSelectProps) {
  const t = useTranslations("customers.CustomerSelect");

  const withNoCustomerItems = [
    { id: "", label: t("noCustomer") },
    ...items.map((item) => ({ id: item.id, label: item.fullName })),
  ];

  return (
    <ResponsiveSelect
      data-test="customer-select"
      label={t("label")}
      name="customerId"
      overlayClassName="w-[var(--trigger-width)]"
      defaultSelectedKey={defaultSelectedKey || ""}
      items={withNoCustomerItems}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
