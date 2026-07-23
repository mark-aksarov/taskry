"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ResponsiveSelect } from "@/dashboard/common/ResponsiveSelect";

interface ClientSelectProps {
  defaultSelectedKey?: string;
  items: { id: number; fullName: string }[];
}

export function ClientSelect({
  defaultSelectedKey,
  items,
}: ClientSelectProps) {
  const t = useTranslations("dashboard.clients.ClientSelect");

  const withNoClientItems = [
    { id: "", label: t("noClient") },
    ...items.map((item) => ({ id: item.id, label: item.fullName })),
  ];

  return (
    <ResponsiveSelect
      data-test="client-select"
      label={t("label")}
      name="clientId"
      overlayClassName="w-[var(--trigger-width)]"
      defaultSelectedKey={defaultSelectedKey || ""}
      items={withNoClientItems}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
