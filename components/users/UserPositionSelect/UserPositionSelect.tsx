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

  const items = [
    { id: "", label: t("noPosition") },
    ...positions.map((item) => ({ id: item.id, label: item.name })),
  ];

  return (
    <ResponsiveSelect
      label={t("label")}
      name="positionId"
      data-test="user-position-select"
      overlayClassName="w-[var(--trigger-width)]"
      defaultSelectedKey={defaultSelectedKey || ""}
      items={items}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
