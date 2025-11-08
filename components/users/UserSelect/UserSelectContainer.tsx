import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { UserSelect } from "./UserSelect";

const getUsers = cache(async (workspaceId: number) => {
  return await prisma.user.findMany({
    where: { position: { workspaceId } },
    select: { id: true, fullName: true },
  });
});

export async function UserSelectContainer() {
  const users = await getUsers(1);

  if (!users.length) {
    return null;
  }

  return <UserSelect users={users} />;
}
