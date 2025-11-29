import { CheckboxGroup, Checkbox } from "@/components/ui";
import { useTranslations } from "next-intl";

export function ProjectFiltersFormCategoryCheckboxGroup({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  const t = useTranslations(
    "projects.ProjectFiltersForm.ProjectFiltersFormCategoryCheckboxGroup",
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
