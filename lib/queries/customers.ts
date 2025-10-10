import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { CustomerPreview } from "./types";

export const getCustomers = cache(
  async (workspaceId: number): Promise<CustomerPreview[]> => {
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
            workspaceId: true,
          },
        },
      },
    });
  },
);
