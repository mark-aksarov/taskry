"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

export function TaskCategorySelect({
  defaultSelectedKey,
  items,
}: {
  defaultSelectedKey?: string;
  items: { id: number; name: string }[];
}) {
  const t = useTranslations("tasks.TaskCategorySelect");

  const withNoCategoryItems = [
    { id: "", label: t("noTaskCategory") },
    ...items.map((item) => ({ id: item.id, label: item.name })),
  ];

  return (
    <ResponsiveSelect
      data-test="task-category-select"
      name="categoryId"
      label={t("label")}
      defaultSelectedKey={defaultSelectedKey || ""}
      overlayClassName="w-[var(--trigger-width)]"
      items={withNoCategoryItems}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
