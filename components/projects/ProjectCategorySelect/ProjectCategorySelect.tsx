"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

interface ProjectCategorySelectProps {
  defaultSelectedKey?: string;
  categories: { id: number; name: string }[];
}

export function ProjectCategorySelect({
  defaultSelectedKey,
  categories,
}: ProjectCategorySelectProps) {
  const t = useTranslations("projects.ProjectCategorySelect");

  const items = [
    { id: "", label: t("noProjectCategory") },
    ...categories.map((item) => ({ id: item.id, label: item.name })),
  ];

  return (
    <ResponsiveSelect
      data-test="project-category-select"
      label={t("label")}
      name="categoryId"
      overlayClassName="w-[var(--trigger-width)]"
      items={items}
      defaultSelectedKey={defaultSelectedKey || ""}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
