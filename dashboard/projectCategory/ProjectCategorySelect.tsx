"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ResponsiveSelect } from "@/common/ResponsiveSelect";

interface ProjectCategorySelectProps {
  defaultSelectedKey?: string;
  items: { id: number; name: string }[];
}

export function ProjectCategorySelect({
  defaultSelectedKey,
  items,
}: ProjectCategorySelectProps) {
  const t = useTranslations(
    "dashboard.projectCategories.ProjectCategorySelect",
  );

  const withNoCategoryItems = [
    { id: "", label: t("noProjectCategory") },
    ...items.map((item) => ({ id: item.id, label: item.name })),
  ];

  return (
    <ResponsiveSelect
      data-test="project-category-select"
      label={t("label")}
      name="categoryId"
      overlayClassName="w-[var(--trigger-width)]"
      items={withNoCategoryItems}
      defaultSelectedKey={defaultSelectedKey || ""}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
