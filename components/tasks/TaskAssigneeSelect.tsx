"use client";

import { Item } from "react-stately";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";
import { useTranslations } from "next-intl";

export function TaskAssigneeSelect({
  defaultSelectedKey,
  items,
}: {
  defaultSelectedKey?: string;
  items: { id: string; fullName: string }[];
}) {
  const t = useTranslations("tasks.TaskAssigneeSelect");

  const withNoAssigneeItems = [
    { id: "", label: t("noAssignee") },
    ...items.map((item) => ({ id: item.id, label: item.fullName })),
  ];

  return (
    <ResponsiveSelect
      data-test="task-assignee-select"
      name="assigneeId"
      defaultSelectedKey={defaultSelectedKey || ""}
      label={t("label")}
      overlayClassName="w-[var(--trigger-width)]"
      items={withNoAssigneeItems}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
