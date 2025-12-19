"use client";

import { Item } from "react-stately";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";
import { useTranslations } from "next-intl";

export function NewProjectFormCategorySelect({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  const t = useTranslations(
    "projects.NewProjectForm.NewProjectFormCategorySelect",
  );

  return (
    <ResponsiveSelect
      label={t("label")}
      name="categoryId"
      placeholder={t("placeholder")}
      overlayClassName="w-[var(--trigger-width)]"
      items={categories.map((item) => ({ id: item.id, label: item.name }))}
      isRequired
      errorMessage={t("validation.required")}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
