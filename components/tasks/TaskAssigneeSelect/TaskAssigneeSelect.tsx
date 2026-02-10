"use client";

import { Item } from "react-stately";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";
import { useTranslations } from "next-intl";

export function TaskAssigneeSelect({
  defaultSelectedKey,
  users,
}: {
  defaultSelectedKey?: string;
  users: { id: string; fullName: string }[];
}) {
  const t = useTranslations("tasks.TaskAssigneeSelect");

  const items = [
    { id: "", label: t("noAssignee") },
    ...users.map((item) => ({ id: item.id, label: item.fullName })),
  ];

  return (
    <ResponsiveSelect
      data-test="task-assignee-select"
      name="assigneeId"
      defaultSelectedKey={defaultSelectedKey || ""}
      label={t("label")}
      overlayClassName="w-[var(--trigger-width)]"
      items={items}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
