"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";

export function TaskFiltersFormProjectCheckboxGroup({
  projects,
}: {
  projects: { id: number; title: string }[];
}) {
  const searchParams = useSearchParams();
  const t = useTranslations("tasks.TaskFiltersFormProjectCheckboxGroup");
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
