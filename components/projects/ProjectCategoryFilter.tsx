"use client";

import { getProjectCategories } from "@/lib/queries/project";
import { CheckboxGroup } from "react-aria-components";
import { fieldStyles, Label } from "../ui/Field";
import { Checkbox } from "../ui/Checkbox";

export async function ProjectCategoryFilter() {
  const categories = await getProjectCategories(1);
  const itemClasses = "capitalize font-normal";

  if (!categories.length) {
    return null;
  }

  return (
    <CheckboxGroup className={fieldStyles()}>
      <Label>Category</Label>
      {categories.map((item) => (
        <Checkbox value={item.id.toString()} className={itemClasses}>
          {item.name}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
