"use client";

import { useTranslations } from "next-intl";
import { CheckboxGroup, Checkbox } from "@/components/ui";
import { useSearchParams } from "next/navigation";

export function TaskFiltersFormProjectCheckboxGroup({
  projects,
}: {
  projects: { id: number; title: string }[];
}) {
  const searchParams = useSearchParams();
  const t = useTranslations(
    "tasks.TaskFiltersForm.TaskFiltersFormProjectCheckboxGroup",
  );
  const initialValues = searchParams.get("project")?.split(",") || [];

  return (
    <CheckboxGroup
      label={t("label")}
      name="project"
      defaultValue={initialValues}
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
