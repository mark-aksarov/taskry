import { useTranslations } from "next-intl";
import { ProjectFilters } from "@/lib/types";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";

export function ProjectFiltersFormCategoryCheckboxGroup({
  filters,
  categories,
}: {
  filters: ProjectFilters;
  categories: { id: number; name: string }[];
}) {
  const t = useTranslations("projects.ProjectFiltersFormCategoryCheckboxGroup");

  return (
    <CheckboxGroup
      name="category"
      label={t("label")}
      defaultValue={filters.category?.map((id) => id.toString())}
    >
      {categories.map((item) => (
        <Checkbox
          data-test={`category-${item.id}-checkbox`}
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
