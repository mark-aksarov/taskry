import "server-only";

import { cache } from "react";
import prisma from "../prisma";

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
