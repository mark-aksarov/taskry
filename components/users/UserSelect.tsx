"use client";

import { use } from "react";
import { Item } from "react-stately";
import { User } from "@/generated/prisma";
import { ResponsiveSelect } from "../common/ResponsiveSelect";

export function UserSelect({
  usersPromise,
}: {
  usersPromise: Promise<User[]>;
}) {
  const users = use(usersPromise);

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
