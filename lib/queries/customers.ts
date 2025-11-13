import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { ThenArg } from "./types";

export type GetCustomersType = ThenArg<ReturnType<typeof getCustomers>>;
export const getCustomers = cache(async (workspaceId: number) => {
  return await prisma.customer.findMany({
    where: {
      company: {
        workspaceId,
      },
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      phoneNumber: true,
      publicLink: true,
      imageUrl: true,

      company: {
        select: {
          id: true,
          name: true,
          workspaceId: true,
        },
      },
    },
  });
});
