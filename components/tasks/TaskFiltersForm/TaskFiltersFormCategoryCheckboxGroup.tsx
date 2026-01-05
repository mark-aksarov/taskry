"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { CheckboxGroup, Checkbox } from "@/components/ui";

export function TaskFiltersFormCategoryCheckboxGroup({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  const searchParams = useSearchParams();
  const t = useTranslations(
    "tasks.TaskFiltersForm.TaskFiltersFormCategoryCheckboxGroup",
  );
  const initialValues = searchParams.get("category")?.split(",") || [];

  return (
    <CheckboxGroup
      label={t("label")}
      name="category"
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
