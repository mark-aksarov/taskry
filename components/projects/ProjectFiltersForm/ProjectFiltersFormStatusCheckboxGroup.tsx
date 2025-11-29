import { Checkbox, CheckboxGroup } from "@/components/ui";
import { useTranslations } from "next-intl";

export function ProjectFiltersFormStatusCheckboxGroup() {
  const t = useTranslations("projects");

  return (
    <CheckboxGroup
      label={t(
        "ProjectFiltersForm.ProjectFiltersFormStatusCheckboxGroup.label",
      )}
    >
      <Checkbox
        key="pending"
        value="pending"
        className="font-normal capitalize"
      >
        {t("ProjectStatus.pending")}
      </Checkbox>

      <Checkbox key="active" value="active" className="font-normal capitalize">
        {t("ProjectStatus.active")}
      </Checkbox>

      <Checkbox
        key="completed"
        value="completed"
        className="font-normal capitalize"
      >
        {t("ProjectStatus.completed")}
      </Checkbox>
    </CheckboxGroup>
  );
}
