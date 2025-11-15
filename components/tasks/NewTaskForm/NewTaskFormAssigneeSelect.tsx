"use client";

import { Item } from "react-stately";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

export function NewTaskFormAssigneeSelect({
  users,
}: {
  users: { id: string; fullName: string }[];
}) {
  if (!users.length) {
    return null;
  }

  return (
    <ResponsiveSelect
      label="Assigned To"
      placeholder="Select user"
      overlayClassName="w-[var(--trigger-width)]"
      items={users.map((item) => ({ id: item.id, label: item.fullName }))}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
