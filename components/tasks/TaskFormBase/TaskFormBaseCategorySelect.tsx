"use client";

import { Item } from "react-stately";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";
import { useTranslations } from "next-intl";

export function TaskFormBaseCategorySelect({
  defaultSelectedKey,
  categories,
}: {
  defaultSelectedKey?: string;
  categories: { id: number; name: string }[];
}) {
  const t = useTranslations("tasks.TaskFormBase.category");

  return (
    <ResponsiveSelect
      data-test="category-select"
      name="categoryId"
      label={t("label")}
      defaultSelectedKey={defaultSelectedKey}
      placeholder={t("placeholder")}
      overlayClassName="w-[var(--trigger-width)]"
      items={categories.map((item) => ({ id: item.id, label: item.name }))}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
