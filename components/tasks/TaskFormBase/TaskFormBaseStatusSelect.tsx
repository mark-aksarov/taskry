"use client";

import { Item } from "react-stately";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

export function TaskFormBaseStatusSelect({
  statuses,
}: {
  statuses: { id: string; name: string }[];
}) {
  return (
    <ResponsiveSelect
      label="Status"
      placeholder="Select status"
      overlayClassName="w-[var(--trigger-width)]"
      items={statuses.map((item) => ({ id: item.id, label: item.name }))}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
