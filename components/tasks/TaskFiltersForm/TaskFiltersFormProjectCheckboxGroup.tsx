"use client";

import { TaskFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";

export function TaskFiltersFormProjectCheckboxGroup({
  filters,
  projects,
}: {
  filters: TaskFilters;
  projects: { id: number; title: string }[];
}) {
  const t = useTranslations("tasks.TaskFiltersFormProjectCheckboxGroup");

  return (
    <CheckboxGroup
      label={t("label")}
      name="project"
      defaultValue={filters.project?.map((id) => id.toString())}
    >
      {projects.map((item) => (
        <Checkbox
          data-test={`project-${item.id}-checkbox`}
          key={item.id}
          value={item.id.toString()}
          className="font-normal capitalize"
        >
          {item.title}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
