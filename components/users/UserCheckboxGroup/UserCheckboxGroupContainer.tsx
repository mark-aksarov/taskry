import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { UserCheckboxGroup } from "./UserCheckboxGroup";

const getUsers = cache(async (workspaceId: number) => {
  return await prisma.user.findMany({
    where: { position: { workspaceId } },
    select: { id: true, fullName: true },
  });
});

export async function UserCheckboxGroupContainer() {
  const users = await getUsers(1);

  if (!users.length) {
    return null;
  }

  return <UserCheckboxGroup users={users} />;
}
