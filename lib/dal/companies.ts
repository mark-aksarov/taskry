import { cache } from "react";
import prisma from "../prisma";
import { mapCompanySummaryToDTO } from "../mappers/companies";
import { getSessionOrThrow } from "../utils/getSessionOrThrow";

export const getCompanySummaries = cache(async () => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  const companies = await prisma.company.findMany({
    where: {
      workspaceId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return companies.map((company) => mapCompanySummaryToDTO(company));
});
