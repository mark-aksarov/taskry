"use client";

import { use } from "react";
import { Item } from "react-stately";
import { TaskCategory } from "@/generated/prisma";
import { ResponsiveSelect } from "../common/ResponsiveSelect";

export function TaskCategorySelect({
  categoriesPromise,
}: {
  categoriesPromise: Promise<TaskCategory[]>;
}) {
  const categories = use(categoriesPromise);

  if (!categories.length) {
    return null;
  }

  return (
    <ResponsiveSelect
      label="Category"
      placeholder="Select category"
      overlayClassName="w-[var(--trigger-width)]"
      items={categories.map((item) => ({ id: item.id, label: item.name }))}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
