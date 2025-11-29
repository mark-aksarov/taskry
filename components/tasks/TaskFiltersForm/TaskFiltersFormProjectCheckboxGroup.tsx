import { useTranslations } from "next-intl";
import { CheckboxGroup, Checkbox } from "@/components/ui";

export function TaskFiltersFormProjectCheckboxGroup({
  projects,
}: {
  projects: { id: number; title: string }[];
}) {
  const t = useTranslations(
    "tasks.TaskFiltersForm.TaskFiltersFormProjectCheckboxGroup",
  );

  return (
    <CheckboxGroup label={t("label")}>
      {projects.map((item) => (
        <Checkbox
          key={item.id}
          value={item.id.toString()}
          className="font-normal capitalize"
        >
          {item.title}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
