"use client";

import { TaskFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";

export function TaskFiltersFormCategoryCheckboxGroup({
  filters,
  categories,
}: {
  filters: TaskFilters;
  categories: { id: number; name: string }[];
}) {
  const t = useTranslations("tasks.TaskFiltersFormCategoryCheckboxGroup");

  return (
    <CheckboxGroup
      label={t("label")}
      name="category"
      defaultValue={filters.category?.map((id) => id.toString())}
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
