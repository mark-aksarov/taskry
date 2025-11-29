import { CheckboxGroup, Checkbox } from "@/components/ui";
import { useTranslations } from "next-intl";

export function ProjectFiltersFormDeadlineCheckboxGroup() {
  const t = useTranslations(
    "projects.ProjectFiltersForm.ProjectFiltersFormDeadlineCheckboxGroup",
  );

  return (
    <CheckboxGroup label={t("label")}>
      <Checkbox key="today" value="1" className="font-normal">
        {t("today")}
      </Checkbox>
      <Checkbox key="tomorrow" value="2" className="font-normal">
        {t("tomorrow")}
      </Checkbox>
      <Checkbox key="thisWeek" value="3" className="font-normal">
        {t("thisWeek")}
      </Checkbox>
      <Checkbox key="overdue" value="4" className="font-normal">
        {t("overdue")}
      </Checkbox>
    </CheckboxGroup>
  );
}
