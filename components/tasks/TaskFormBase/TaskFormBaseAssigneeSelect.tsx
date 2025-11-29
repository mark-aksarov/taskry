"use client";

import { Item } from "react-stately";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";
import { useTranslations } from "next-intl";

export function TaskFormBaseAssigneeSelect({
  users,
}: {
  users: { id: string; fullName: string }[];
}) {
  const t = useTranslations("tasks.TaskFormBase.TaskFormBaseAssigneeSelect");

  return (
    <ResponsiveSelect
      label={t("label")}
      placeholder={t("placeholder")}
      overlayClassName="w-[var(--trigger-width)]"
      items={users.map((item) => ({ id: item.id, label: item.fullName }))}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
