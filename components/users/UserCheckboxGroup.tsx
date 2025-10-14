"use client";

import { use } from "react";
import { User } from "@/generated/prisma";
import { Checkbox, CheckboxGroup } from "@/components/ui";

export function UserCheckboxGroup({
  usersPromise,
}: {
  usersPromise: Promise<User[]>;
}) {
  const users = use(usersPromise);
  const itemClasses = "capitalize font-normal";

  if (!users.length) {
    return null;
  }

  return (
    <CheckboxGroup label="Creator">
      {users.map((user) => (
        <Checkbox
          key={user.id}
          value={user.id.toString()}
          className={itemClasses}
        >
          {user.fullName}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
