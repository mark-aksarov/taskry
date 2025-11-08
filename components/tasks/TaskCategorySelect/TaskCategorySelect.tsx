"use client";

import { Item } from "react-stately";
import { TaskCategory } from "@/generated/prisma";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

export function TaskCategorySelect({
  categories,
}: {
  categories: Pick<TaskCategory, "id" | "name">[];
}) {
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
