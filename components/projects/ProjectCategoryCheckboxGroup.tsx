import { use } from "react";
import { ProjectCategory } from "@/generated/prisma";
import { CheckboxGroup, Checkbox } from "@/components/ui";

export function ProjectCategoryCheckboxGroup({
  categoriesPromise,
}: {
  categoriesPromise: Promise<ProjectCategory[]>;
}) {
  const categories = use(categoriesPromise);

  if (!categories.length) {
    return null;
  }

  return (
    <CheckboxGroup label="Category">
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
