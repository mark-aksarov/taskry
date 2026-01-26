"use client";

import { TaskFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";

export function TaskFiltersFormStatusCheckboxGroup({
  filters,
}: {
  filters: TaskFilters;
}) {
  const t = useTranslations("tasks.TaskFiltersFormStatusCheckboxGroup");
  const tStatus = useTranslations("tasks.TaskStatus");

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
