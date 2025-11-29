import { useTranslations } from "next-intl";
import { CheckboxGroup, Checkbox } from "@/components/ui";

export function TaskFiltersFormCategoryCheckboxGroup({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  const t = useTranslations(
    "tasks.TaskFiltersForm.TaskFiltersFormCategoryCheckboxGroup",
  );

  return (
    <CheckboxGroup label={t("label")}>
      {categories.map((item) => (
        <Checkbox
          key={item.id}
          value={item.id.toString()}
          className="font-normal capitalize"
        >
          {item.name}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
