"use client";

import { Item } from "react-stately";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";
import { useTranslations } from "next-intl";

export function TaskFormBaseAssigneeSelect({
  defaultSelectedKey,
  users,
}: {
  defaultSelectedKey?: string;
  users: { id: string; fullName: string }[];
}) {
  const t = useTranslations("tasks.TaskFormBase.assignee");

  return (
    <ResponsiveSelect
      data-test="assignee-select"
      name="assigneeId"
      defaultSelectedKey={defaultSelectedKey}
      label={t("label")}
      placeholder={t("placeholder")}
      overlayClassName="w-[var(--trigger-width)]"
      items={users.map((item) => ({ id: item.id, label: item.fullName }))}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
