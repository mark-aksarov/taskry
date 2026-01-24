"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";

export function ProjectFiltersFormCategoryCheckboxGroup({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  const t = useTranslations("projects.ProjectFiltersFormCategoryCheckboxGroup");

  const searchParams = useSearchParams();
  const initialValues = searchParams.get("category")?.split(",") || [];

  return (
    <CheckboxGroup
      name="category"
      label={t("label")}
      defaultValue={initialValues}
    >
      {categories.map((item) => (
        <Checkbox
          data-test={`category-${item.id}-checkbox`}
          key={item.id}
          value={item.id.toString()}
          className="font-normal capitalize"
        >
          {item.name}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
