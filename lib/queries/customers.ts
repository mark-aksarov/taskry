import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { Customer } from "@/generated/prisma";

export const getCustomers = cache(
  async (workspaceId: number): Promise<Customer[]> => {
    return await prisma.customer.findMany({
      where: {
        company: {
          workspaceId,
        },
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  },
);
