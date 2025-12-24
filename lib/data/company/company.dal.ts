"server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { CreateCompanyInputDTO } from "./company.dto";
import { companySummarySelect } from "./company.select";
import { mapCompanySummaryToDTO } from "./company.mapper";
import { getSessionOrThrow } from "@/lib/data/utils/getSessionOrThrow";

export const getCompanySummaries = cache(async () => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  const companies = await prisma.company.findMany({
    where: {
      workspaceId,
    },
    select: companySummarySelect,
  });

  return companies.map((company) => mapCompanySummaryToDTO(company));
});

export const createCompany = async (company: CreateCompanyInputDTO) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  return await prisma.company.create({
    data: {
      ...company,
      workspaceId,
    },
  });
};
