"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

interface UserFormBasePositionSelectProps {
  defaultSelectedKey?: string;
  positions: { id: number; name: string }[];
}

export function UserFormBasePositionSelect({
  defaultSelectedKey,
  positions,
}: UserFormBasePositionSelectProps) {
  const t = useTranslations("users.UserFormBasePositionSelect");

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
