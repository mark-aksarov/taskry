"server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { companySummarySelect } from "./company.select";
import { mapCompanySummaryToDTO } from "./company.mapper";
import { getSessionOrThrow } from "@/lib/utils/getSessionOrThrow";

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
