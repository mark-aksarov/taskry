import { CheckboxGroup, Checkbox } from "@/components/ui";
import { useTranslations } from "next-intl";

interface ProjectFiltersFormDeadlineCheckboxGroupProps {
  value: string[];
  onChange: (values: string[]) => void;
}

export function ProjectFiltersFormDeadlineCheckboxGroup({
  value,
  onChange,
}: ProjectFiltersFormDeadlineCheckboxGroupProps) {
  const t = useTranslations(
    "projects.ProjectFiltersForm.ProjectFiltersFormDeadlineCheckboxGroup",
  );

  return (
    <CheckboxGroup
      label={t("label")}
      name="deadline"
      value={value}
      onChange={onChange}
    >
      <Checkbox key="today" value="today" className="font-normal">
        {t("today")}
      </Checkbox>
      <Checkbox key="tomorrow" value="tomorrow" className="font-normal">
        {t("tomorrow")}
      </Checkbox>
      <Checkbox key="thisWeek" value="thisWeek" className="font-normal">
        {t("thisWeek")}
      </Checkbox>
      <Checkbox key="overdue" value="overdue" className="font-normal">
        {t("overdue")}
      </Checkbox>
    </CheckboxGroup>
  );
}
