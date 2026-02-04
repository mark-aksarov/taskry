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

  return (
    <ResponsiveSelect
      data-test="category-select"
      label={t("label")}
      name="categoryId"
      placeholder={t("placeholder")}
      overlayClassName="w-[var(--trigger-width)]"
      items={categories.map((item) => ({ id: item.id, label: item.name }))}
      isRequired
      defaultSelectedKey={defaultSelectedKey}
      errorMessage={t("validation.required")}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
