"use client";

import { Item } from "react-stately";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";
import { useTranslations } from "next-intl";

interface TaskAssigneeSelectProps {
  forcedAssigneeId?: string;
  defaultSelectedKey?: string;
  items: { id: string; fullName: string }[];
}

export function TaskAssigneeSelect({
  forcedAssigneeId,
  defaultSelectedKey,
  items,
}: TaskAssigneeSelectProps) {
  const t = useTranslations("tasks.TaskAssigneeSelect");

  const withNoAssigneeItems = [
    { id: "", label: t("noAssignee") },
    ...items.map((item) => ({ id: item.id, label: item.fullName })),
  ];

  return (
    <ResponsiveSelect
      data-test="task-assignee-select"
      name="assigneeId"
      defaultSelectedKey={defaultSelectedKey || forcedAssigneeId || ""}
      label={t("label")}
      overlayClassName="w-[var(--trigger-width)]"
      items={withNoAssigneeItems}
      className={forcedAssigneeId ? "hidden" : ""}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
