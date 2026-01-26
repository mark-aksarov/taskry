"use client";

import { useTranslations } from "next-intl";
import { ProjectFilters } from "@/lib/types";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";

export function ProjectFiltersFormStatusCheckboxGroup({
  filters,
}: {
  filters: ProjectFilters;
}) {
  const t = useTranslations("projects.ProjectFiltersFormStatusCheckboxGroup");
  const tStatus = useTranslations("projects.ProjectStatus");

  return (
    <CheckboxGroup
      name="status"
      label={t("label")}
      defaultValue={filters.status?.map((id) => id.toString())}
    >
      <Checkbox
        data-test="pending-checkbox"
        key="pending"
        value="pending"
        className="font-normal capitalize"
      >
        {tStatus("pending")}
      </Checkbox>

      <Checkbox
        data-test="active-checkbox"
        key="active"
        value="active"
        className="font-normal capitalize"
      >
        {tStatus("active")}
      </Checkbox>

      <Checkbox
        data-test="completed-checkbox"
        key="completed"
        value="completed"
        className="font-normal capitalize"
      >
        {tStatus("completed")}
      </Checkbox>
    </CheckboxGroup>
  );
}
