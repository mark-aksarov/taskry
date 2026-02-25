"use client";

import {
  useProjectFilters,
  useProjectFiltersDispatch,
} from "../ProjectFiltersContext";

import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";

export function ProjectFiltersFormStatusCheckboxGroup() {
  const tStatus = useTranslations("projects.ProjectStatus");
  const t = useTranslations("projects.ProjectFiltersFormStatusCheckboxGroup");

  const filters = useProjectFilters();
  const dispatch = useProjectFiltersDispatch();

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
