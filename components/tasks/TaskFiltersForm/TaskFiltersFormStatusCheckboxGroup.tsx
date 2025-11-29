import { useTranslations } from "next-intl";
import { CheckboxGroup, Checkbox } from "@/components/ui";

export function TaskFiltersFormStatusCheckboxGroup() {
  const t = useTranslations("tasks");

  return (
    <CheckboxGroup
      label={t("TaskFiltersForm.TaskFiltersFormStatusCheckboxGroup.label")}
    >
      <Checkbox
        key="pending"
        value="pending"
        className="font-normal capitalize"
      >
        {t("TaskStatus.pending")}
      </Checkbox>

      <Checkbox key="active" value="active" className="font-normal capitalize">
        {t("TaskStatus.active")}
      </Checkbox>

      <Checkbox
        key="completed"
        value="completed"
        className="font-normal capitalize"
      >
        {t("TaskStatus.completed")}
      </Checkbox>
    </CheckboxGroup>
  );
}
