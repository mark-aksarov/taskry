"use client";

import { User } from "@/generated/prisma";
import { Checkbox, CheckboxGroup } from "@/components/ui";

export function UserCheckboxGroup({
  users,
}: {
  users: Pick<User, "id" | "fullName">[];
}) {
  if (!users.length) {
    return null;
  }

  return (
    <CheckboxGroup label="Creator">
      {users.map((user) => (
        <Checkbox
          key={user.id}
          value={user.id.toString()}
          className="font-normal capitalize"
        >
          {user.fullName}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
