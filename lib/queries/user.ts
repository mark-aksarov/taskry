import { cache } from "react";
import prisma from "../prisma";
import { User } from "@/generated/prisma";

export const getUsers = cache(async (workspaceId: number): Promise<User[]> => {
  return await prisma.user.findMany({
    where: { position: { workspaceId } },
    include: {
      position: {
        select: {
          workspaceId: true,
        },
      },
    },
  });
});
