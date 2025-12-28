import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { CreateCompanyInputDTO } from "./company.dto";
import { verifySession } from "../utils/verifySession";

export const getAllCompanies = cache(async () => {
  const {
    user: { workspaceId },
  } = await verifySession();

  return await prisma.company.findMany({
    where: {
      workspaceId,
    },
    select: {
      id: true,
      name: true,
    },
  });
});

export const createCompany = async (company: CreateCompanyInputDTO) => {
  const {
    user: { workspaceId },
  } = await verifySession();

  return await prisma.company.create({
    data: {
      ...company,
      workspaceId,
    },
  });
};
