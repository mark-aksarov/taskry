"use client";

import { CheckboxGroup } from "react-aria-components";
import { fieldStyles, Label } from "../ui/Field";
import { Checkbox } from "../ui/Checkbox";
import { User } from "@/generated/prisma";
import { use } from "react";

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
    <CheckboxGroup className={fieldStyles()}>
      <Label>Creator</Label>
      {users.map((user) => (
        <Checkbox
          key={user.id}
          value={user.id.toString()}
          className={itemClasses}
        >
          {user.name}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
