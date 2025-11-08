"use client";

import { Item } from "react-stately";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

export function ProjectSelect({
  projects,
}: {
  projects: { id: number; title: string }[];
}) {
  if (!projects.length) {
    return null;
  }

  return (
    <ResponsiveSelect
      label="Project"
      placeholder="Select project"
      overlayClassName="w-[var(--trigger-width)]"
      items={projects.map((item) => ({ id: item.id, label: item.title }))}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
