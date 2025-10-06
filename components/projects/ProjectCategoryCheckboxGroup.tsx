import { use } from "react";
import { ProjectCategory } from "@/generated/prisma";
import {
  fieldStyles,
  Label,
  RACCheckboxGroup,
  Checkbox,
} from "@/components/ui";

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
    <RACCheckboxGroup className={fieldStyles()}>
      <Label>Category</Label>
      {categories.map((item) => (
        <Checkbox
          key={item.id}
          value={item.id.toString()}
          className="font-normal capitalize"
        >
          {item.name}
        </Checkbox>
      ))}
    </RACCheckboxGroup>
  );
}
