import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { Company } from "@/generated/prisma";

export const getCompanies = cache(
  async (workspaceId: number): Promise<Company[]> => {
    return await prisma.company.findMany({
      where: {
        workspaceId,
      },
    });
  },
);
