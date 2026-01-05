"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Checkbox, CheckboxGroup } from "@/components/ui";

export function ProjectFiltersFormStatusCheckboxGroup() {
  const t = useTranslations("projects");
  const searchParams = useSearchParams();
  const initialValues = searchParams.get("status")?.split(",") || [];

  return (
    <CheckboxGroup
      name="status"
      label={t(
        "ProjectFiltersForm.ProjectFiltersFormStatusCheckboxGroup.label",
      )}
      defaultValue={initialValues}
    >
      <Checkbox
        data-test="pending-checkbox"
        key="pending"
        value="pending"
        className="font-normal capitalize"
      >
        {t("ProjectStatus.pending")}
      </Checkbox>

      <Checkbox
        data-test="active-checkbox"
        key="active"
        value="active"
        className="font-normal capitalize"
      >
        {t("ProjectStatus.active")}
      </Checkbox>

      <Checkbox
        data-test="completed-checkbox"
        key="completed"
        value="completed"
        className="font-normal capitalize"
      >
        {t("ProjectStatus.completed")}
      </Checkbox>
    </CheckboxGroup>
  );
}
