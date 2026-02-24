"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

export function TaskProjectSelect({
  defaultSelectedKey,
  items,
}: {
  defaultSelectedKey?: string;
  items: { id: number; title: string }[];
}) {
  const t = useTranslations("tasks.TaskProjectSelect");

  return (
    <ResponsiveSelect
      data-test="task-project-select"
      name="projectId"
      label={t("label")}
      defaultSelectedKey={defaultSelectedKey}
      placeholder={t("placeholder")}
      isRequired
      errorMessage={t("validation.required")}
      overlayClassName="w-[var(--trigger-width)]"
      items={items.map((item) => ({ id: item.id, label: item.title }))}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
