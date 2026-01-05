"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { CheckboxGroup, Checkbox } from "@/components/ui";

export function TaskFiltersFormStatusCheckboxGroup() {
  const t = useTranslations("tasks");
  const searchParams = useSearchParams();
  const initialValues = searchParams.get("status")?.split(",") || [];

  return (
    <CheckboxGroup
      name="status"
      label={t("TaskFiltersForm.TaskFiltersFormStatusCheckboxGroup.label")}
      defaultValue={initialValues}
    >
      <Checkbox
        data-test="pending-checkbox"
        key="pending"
        value="pending"
        className="font-normal capitalize"
      >
        {t("TaskStatus.pending")}
      </Checkbox>

      <Checkbox
        data-test="active-checkbox"
        key="active"
        value="active"
        className="font-normal capitalize"
      >
        {t("TaskStatus.active")}
      </Checkbox>

      <Checkbox
        data-test="completed-checkbox"
        key="completed"
        value="completed"
        className="font-normal capitalize"
      >
        {t("TaskStatus.completed")}
      </Checkbox>
    </CheckboxGroup>
  );
}
