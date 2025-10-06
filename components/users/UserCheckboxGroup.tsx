"use client";

import {
  Checkbox,
  fieldStyles,
  Label,
  RACCheckboxGroup,
} from "@/components/ui";
import { use } from "react";
import { User } from "@/generated/prisma";

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
    <RACCheckboxGroup className={fieldStyles()}>
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
    </RACCheckboxGroup>
  );
}
