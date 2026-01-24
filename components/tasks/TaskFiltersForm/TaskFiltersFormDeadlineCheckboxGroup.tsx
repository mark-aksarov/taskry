import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";

interface TaskFiltersFormDeadlineCheckboxGroupProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function TaskFiltersFormDeadlineCheckboxGroup({
  value,
  onChange,
}: TaskFiltersFormDeadlineCheckboxGroupProps) {
  const t = useTranslations("tasks.TaskFiltersFormDeadlineCheckboxGroup");

  return (
    <CheckboxGroup
      label={t("label")}
      name="deadline"
      value={value}
      onChange={onChange}
    >
      <Checkbox
        data-test="today-deadline-checkbox"
        key="today"
        value="today"
        className="font-normal"
      >
        {t("today")}
      </Checkbox>
      <Checkbox
        data-test="tomorrow-deadline-checkbox"
        key="tomorrow"
        value="tomorrow"
        className="font-normal"
      >
        {t("tomorrow")}
      </Checkbox>
      <Checkbox
        data-test="this-week-deadline-checkbox"
        key="thisWeek"
        value="thisWeek"
        className="font-normal"
      >
        {t("thisWeek")}
      </Checkbox>
      <Checkbox
        data-test="overdue-deadline-checkbox"
        key="overdue"
        value="overdue"
        className="font-normal"
      >
        {t("overdue")}
      </Checkbox>
    </CheckboxGroup>
  );
}
