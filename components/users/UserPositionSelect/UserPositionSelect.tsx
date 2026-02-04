"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

interface UserPositionSelectProps {
  defaultSelectedKey?: string;
  positions: { id: number; name: string }[];
}

export function UserPositionSelect({
  defaultSelectedKey,
  positions,
}: UserPositionSelectProps) {
  const t = useTranslations("users.UserPositionSelect");

  return (
    <ResponsiveSelect
      label={t("label")}
      name="positionId"
      data-test="position-select"
      placeholder={t("placeholder")}
      overlayClassName="w-[var(--trigger-width)]"
      defaultSelectedKey={defaultSelectedKey}
      items={positions.map((item) => ({ id: item.id, label: item.name }))}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
