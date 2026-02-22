"use client";

import {
  useTaskFilters,
  useTaskFiltersDispatch,
} from "@/components/tasks/TaskFiltersContext";

import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";

export function TaskFiltersFormStatusCheckboxGroup() {
  const tStatus = useTranslations("tasks.TaskStatus");
  const t = useTranslations("tasks.TaskFiltersFormStatusCheckboxGroup");

  const filters = useTaskFilters();
  const dispatch = useTaskFiltersDispatch();

  return (
    <CheckboxGroup
      name="status"
      label={t("label")}
      value={filters.status}
      onChange={(value) =>
        dispatch({ type: "setStatus", payload: value as any })
      }
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
