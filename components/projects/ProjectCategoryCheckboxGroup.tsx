"use client";

import { CheckboxGroup } from "react-aria-components";
import { fieldStyles, Label } from "../ui/Field";
import { Checkbox } from "../ui/Checkbox";
import { ProjectCategory } from "@/generated/prisma";
import { use } from "react";

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
    <CheckboxGroup className={fieldStyles()}>
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
    </CheckboxGroup>
  );
}
