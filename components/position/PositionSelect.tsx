"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

interface PositionSelectProps {
  defaultSelectedKey?: string;
  items: { id: number; name: string }[];
}

export function PositionSelect({
  defaultSelectedKey,
  items,
}: PositionSelectProps) {
  const t = useTranslations("positions.PositionSelect");

  const withNoPositionItems = [
    { id: "", label: t("noPosition") },
    ...items.map((item) => ({ id: item.id, label: item.name })),
  ];

  return (
    <ResponsiveSelect
      label={t("label")}
      name="positionId"
      data-test="position-select"
      overlayClassName="w-[var(--trigger-width)]"
      defaultSelectedKey={defaultSelectedKey || ""}
      items={withNoPositionItems}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
